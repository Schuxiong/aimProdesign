<template>
  <div class="main-container">
    <!-- 顶部标题 -->
    <div class="header">
      <span class="close-icon">×</span>
      <span class="title">创建客群</span>
    </div>

    <!-- 基本信息 -->
    <div class="basic-info">
      <div class="section-title">
        <div class="green-bar"></div>
        <span>基本信息</span>
      </div>
      
      <div class="form-content">
        <div class="form-item">
          <label><span class="required">*</span>客户类型：</label>
          <div class="radio-group">
            <label class="radio-item">
              <input type="radio" name="customerType" value="retail">
              <span>零售客户</span>
            </label>
            <label class="radio-item">
              <input type="radio" name="customerType" value="corporate">
              <span>对公客户</span>
            </label>
            <label class="radio-item">
              <input type="radio" name="customerType" value="company" checked>
              <span>对公公司</span>
            </label>
          </div>
        </div>
        
        <div class="form-item">
          <label><span class="required">*</span>客群名称：</label>
          <input type="text" placeholder="请选择">
        </div>
        
        <div class="form-item">
          <label>客群描述：</label>
          <input type="text" placeholder="请选择">
        </div>
        
        <div class="form-item">
          <label>使用系统：</label>
          <input type="text" placeholder="请选择">
        </div>
      </div>
    </div>

    <!-- 主体内容区域 - 左右两列 -->
    <div class="main-content">
      <!-- 左列 - 客群圈选 -->
      <div class="left-column">
        <div class="customer-selection">
          <!-- 客群圈选标题 -->
          <div class="section-title">
            <div class="green-bar"></div>
            <span>客群圈选</span>
          </div>

          <!-- 包含功能区 -->
          <div class="selection-content">
            <!-- 包含条件组 -->
            <div v-for="(group, groupIndex) in conditionGroups" 
                 :key="groupIndex" 
                 class="condition-group include">
              <div class="condition-header">
                <span class="icon-text">
                  <i class="user-icon"></i>
                  包含符合以下条件的客群：
                </span>
                <i class="delete-icon" @click="deleteConditionGroup(groupIndex)"></i>
              </div>
              
              <!-- 规则集合容器 -->
              <div class="rules-container">
                <!-- 规则集合 -->
                <template v-for="(ruleSet, setIndex) in group.ruleSets" :key="setIndex">
                  <div class="rule-set">
                    <!-- 规则集合内的规则 -->
                    <div class="condition-items">
                      <template v-for="(rule, ruleIndex) in ruleSet.rules" :key="ruleIndex">
                        <!-- 单条规则 -->
                        <div class="rule-item">
                          <div class="rule-content">
                            <div class="field-select">
                              <span>{{ rule.field }}</span>
                              <i class="triangle-icon"></i>
                            </div>
                            <div class="operator-select">
                              <button class="operator-btn">
                                <span>{{ rule.operator }}</span>
                                <i class="triangle-icon"></i>
                              </button>
                            </div>
                            <div class="value-tags">
                              <div class="tag" v-for="(value, vIndex) in rule.values" :key="vIndex">
                                <span>{{ value }}</span>
                                <i class="close-icon"></i>
                              </div>
                            </div>
                            <div class="rule-actions">
                              <button v-if="ruleIndex === ruleSet.rules.length - 1" 
                                      class="add-btn"
                                      @click="addRule(setIndex)">+</button>
                              <i class="delete-icon" @click="deleteRule(setIndex, ruleIndex)"></i>
                            </div>
                          </div>
                        </div>

                        <!-- 规则间的连接符 -->
                        <div v-if="ruleIndex < ruleSet.rules.length - 1" 
                             class="connector" 
                             @click="toggleConnector(setIndex, ruleIndex)">
                          <div class="dashed-line"></div>
                          <div class="connector-btn" :class="rule.connector">
                            {{ rule.connector === 'and' ? '且' : 
                               rule.connector === 'or' ? '或' : '非' }}
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>

                  <!-- 规则集合间的连接符 -->
                  <div v-if="setIndex < group.ruleSets.length - 1" 
                       class="set-connector" 
                       @click="toggleSetConnector(setIndex)">
                    <div class="dashed-line"></div>
                    <div class="connector-btn" :class="ruleSet.connector">
                      {{ ruleSet.connector === 'and' ? '且' : 
                         ruleSet.connector === 'or' ? '或' : '非' }}
                    </div>
                  </div>
                </template>
              </div>

              <!-- 在条件区底部添加新增规则集合的按钮 -->
              <div class="condition-footer">
                <button class="add-btn" @click="addRuleSet(groupIndex)">+</button>
              </div>
            </div>
            
            <!-- 文件上传区域 -->
            <div v-if="showFileUpload" class="file-upload include">
              <div class="upload-header">
                <span class="icon-text">
                  <i class="file-icon"></i>
                  添加客群文件
                </span>
                <div class="header-actions">
                  <button class="download-btn" @click="downloadTemplate">
                    <i class="download-icon"></i>
                    下载模板
                  </button>
                  <i class="delete-icon" @click="deleteFileUpload"></i>
                </div>
              </div>
              
              <div class="upload-content" 
                   @click="handleUploadClick" 
                   @drop.prevent="handleDrop" 
                   @dragover.prevent
                   :class="{ 'no-more': uploadedFiles.length >= 4 }">
                <div class="files-container">
                  <!-- 已上传文件列表 -->
                  <div v-for="(file, index) in uploadedFiles" 
                       :key="index" 
                       class="file-card">
                    <div class="file-info">
                      <i class="excel-icon"></i>
                      <div class="file-text">
                        <span class="file-name">{{ file.name }}</span>
                        <span class="file-count">文件包含<span class="number">{{ file.count }}</span>条数据</span>
                      </div>
                    </div>
                    <i class="delete-icon" @click.stop="deleteFile(index)"></i>
                  </div>

                  <!-- 上传提示文字，仅在文件数量小于4时显示 -->
                  <div v-if="uploadedFiles.length < 4" class="upload-hint">
                    点击/拖动到此上传文件
                  </div>
                </div>

                <!-- 隐藏的文件输入框 -->
                <input type="file" 
                       ref="fileInput" 
                       style="display: none" 
                       @change="handleFileChange"
                       accept=".xlsx,.xls">
              </div>
            </div>

            <!-- 组合条件模版区域 -->
            <div v-if="showTemplateArea" class="template-area include">
              <div class="template-header">
                <span class="icon-text">
                  <i class="template-icon"></i>
                  组合条件模版
                </span>
                <i class="delete-icon" @click="deleteTemplateArea"></i>
              </div>
              
              <div class="template-content">
                <!-- 搜索区域 -->
                <div class="template-search">
                  <div class="search-item">
                    <span class="label">创建人</span>
                    <input type="text" 
                           v-model="templateSearch.creator" 
                           placeholder="请输入创建人"
                           @input="searchTemplates">
                  </div>
                  <div class="search-item">
                    <span class="label">项目组</span>
                    <input type="text" 
                           v-model="templateSearch.team" 
                           placeholder="请输入项目组"
                           @input="searchTemplates">
                  </div>
                  <div class="search-item">
                    <span class="label">模版名称</span>
                    <input type="text" 
                           v-model="templateSearch.name" 
                           placeholder="请输入模版名称"
                           @input="searchTemplates">
                  </div>
                </div>

                <!-- 选择器 -->
                <div class="template-select" 
                     @click="showTemplateList = !showTemplateList">
                  <span :class="{ 'selected': selectedTemplates.length > 0 }">
                    {{ selectedTemplates.length > 0 ? `已选择 ${selectedTemplates.length} 个模版` : '请选择' }}
                  </span>
                  <i class="triangle-icon"></i>
                  
                  <!-- 模版列表下拉框 -->
                  <div v-if="showTemplateList" class="template-list">
                    <div v-for="template in filteredTemplates" 
                         :key="template.id" 
                         class="template-item"
                         :class="{ 'selected': isTemplateSelected(template) }"
                         @click.stop="toggleTemplate(template)">
                      <i class="checkbox-icon"></i>
                      <div class="template-info">
                        <span class="template-name">{{ template.name }}</span>
                        <div class="template-meta">
                          <span class="creator">{{ template.creator }}</span>
                          <span class="divider">|</span>
                          <span class="team">{{ template.team }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 已选模版展示区 -->
                <div v-if="selectedTemplates.length > 0" class="selected-templates">
                  <div v-for="template in selectedTemplates" 
                       :key="template.id"
                       class="selected-template-card"
                       @mouseenter="showPreviewForTemplate(template, $event)"
                       @mouseleave="startHidePreview">
                    <div class="template-info">
                      <span class="template-name">{{ template.name }}</span>
                      <i class="delete-icon" @click.stop="removeTemplate(template)"></i>
                    </div>
                    
                    <!-- 预览框和安全区域 -->
                    <div v-if="previewTemplate === template" 
                         class="preview-wrapper"
                         :style="previewPosition"
                         @mouseenter="cancelHidePreview"
                         @mouseleave="startHidePreview">
                      <div class="template-preview">
                        <div class="preview-title">条件组合预览</div>
                        <div class="preview-content">
                          <!-- 包含条件 -->
                          <div class="preview-section include">
                            <div class="section-label">包含以下客群：</div>
                            <template v-for="(group, groupIndex) in template.conditions" :key="groupIndex">
                              <div class="preview-group">
                                <template v-for="(ruleSet, setIndex) in group.ruleSets" :key="setIndex">
                                  <div class="rule-set">
                                    <template v-for="(rule, ruleIndex) in ruleSet.rules" :key="ruleIndex">
                                      <div class="rule-line">
                                        {{ rule.field }}
                                        <span class="operator">{{ rule.operator }}</span>
                                        <span class="values">{{ rule.values.join('、') }}</span>
                                        <span v-if="ruleIndex < ruleSet.rules.length - 1" 
                                              class="text-connector">
                                          {{ rule.connector === 'and' ? '且' : 
                                             rule.connector === 'or' ? '或' : '非' }}
                                        </span>
                                      </div>
                                    </template>
                                  </div>
                                  <div v-if="setIndex < group.ruleSets.length - 1" 
                                       class="text-connector set-connector">
                                    {{ ruleSet.connector === 'and' ? '且' : 
                                       ruleSet.connector === 'or' ? '或' : '非' }}
                                  </div>
                                </template>
                              </div>
                              <div v-if="groupIndex < template.conditions.length - 1" 
                                   class="text-connector group-connector">
                                或
                              </div>
                            </template>
                          </div>
                          
                          <!-- 排除条件 -->
                          <div v-if="template.excludeConditions" class="preview-section exclude">
                            <div class="section-label">排除以下客群：</div>
                            <template v-for="(group, groupIndex) in template.excludeConditions" :key="groupIndex">
                              <div class="preview-group">
                                <template v-for="(ruleSet, setIndex) in group.ruleSets" :key="setIndex">
                                  <div class="rule-set">
                                    <template v-for="(rule, ruleIndex) in ruleSet.rules" :key="ruleIndex">
                                      <div class="rule-line">
                                        {{ rule.field }}
                                        <span class="operator">{{ rule.operator }}</span>
                                        <span class="values">{{ rule.values.join('、') }}</span>
                                        <span v-if="ruleIndex < ruleSet.rules.length - 1" 
                                              class="text-connector">
                                          {{ rule.connector === 'and' ? '且' : 
                                             rule.connector === 'or' ? '或' : '非' }}
                                        </span>
                                      </div>
                                    </template>
                                  </div>
                                  <div v-if="setIndex < group.ruleSets.length - 1" 
                                       class="text-connector set-connector">
                                    {{ ruleSet.connector === 'and' ? '且' : 
                                       ruleSet.connector === 'or' ? '或' : '非' }}
                                  </div>
                                </template>
                              </div>
                              <div v-if="groupIndex < template.excludeConditions.length - 1" 
                                   class="text-connector group-connector">
                                或
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 事件圈人功能区 -->
            <div v-if="showEventSequence" class="event-sequence include">
              <div class="sequence-header">
                <span class="icon-text">
                  <i class="event-icon"></i>
                  事件序列圈人
                </span>
                <i class="delete-icon" @click="deleteEventSequence"></i>
              </div>
              
              <div class="sequence-content">
                <!-- 序列步骤列表 -->
                <div class="sequence-steps">
                  <div v-for="(step, stepIndex) in eventSteps" 
                       :key="stepIndex" 
                       class="sequence-step">
                    <div class="step-header">
                      <div class="step-number">{{ stepIndex + 1 }}</div>
                      <div class="step-title">Step {{ stepIndex + 1 }}</div>
                      <div class="step-actions">
                        <div class="user-selector">
                          <i class="user-icon"></i>
                          <i class="triangle-icon"></i>
                        </div>
                        <i class="delete-icon" @click="removeEventStep(stepIndex)"></i>
                      </div>
                    </div>
                    
                    <div class="step-content">
                      <!-- 事件选择器 -->
                      <div class="event-condition">
                        <div class="event-selector">
                          <div class="select-container">
                            <div class="select-trigger" @click="toggleEventDropdown(stepIndex)">
                              <span>{{ step.event || '选择事件' }}</span>
                              <i class="triangle-icon"></i>
                            </div>
                            
                            <div v-if="step.showEventDropdown" class="select-dropdown">
                              <div v-for="event in eventOptions" 
                                   :key="event.value"
                                   class="dropdown-item"
                                   @click="selectEvent(stepIndex, event)">
                                {{ event.label }}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <!-- 第一个条件 -->
                        <div v-if="step.conditions.length > 0" class="condition-wrapper">
                          <div class="param-operator">
                            <span>{{ step.conditions[0].operator }}</span>
                            <i class="triangle-icon"></i>
                          </div>
                          
                          <div class="param-value">
                            <div class="param-input">
                              <input type="text" v-model="step.conditions[0].value" placeholder="请输入" />
                            </div>
                          </div>
                          
                          <div class="add-param">
                            <i class="plus-icon" @click="addParameter(stepIndex, 0)"></i>
                          </div>
                          
                          <i class="delete-icon" @click="removeCondition(stepIndex, 0)"></i>
                        </div>
                      </div>
                      
                      <!-- OR连接符 - 固定在第一个条件后 -->
                      <div v-if="step.conditions.length > 0" class="condition-connector">
                        <button class="connector-btn or">OR</button>
                      </div>
                      
                      <!-- Add new condition 按钮 -->
                      <div class="add-new-condition" @click="addCondition(stepIndex)">
                        <div class="condition-select">
                          <span>Add new condition</span>
                          <i class="triangle-icon"></i>
                        </div>
                      </div>
                      
                      <!-- AND连接符 -->
                      <div v-if="step.conditions.length > 1" class="condition-connector">
                        <button class="connector-btn and">AND</button>
                      </div>
                      
                      <!-- 额外的条件列表 -->
                      <div v-for="(condition, condIndex) in step.conditions.slice(1)" 
                           :key="condIndex + 1"
                           class="add-new-condition">
                        <div class="condition-select">
                          <span>Add new condition</span>
                          <i class="triangle-icon"></i>
                        </div>
                        <i class="delete-icon" @click="removeCondition(stepIndex, condIndex + 1)"></i>
                      </div>
                      
                      <!-- AND/OR 切换按钮 -->
                      <div class="step-bottom-actions">
                        <button class="action-btn and">And</button>
                      </div>
                    </div>
                    
                    <!-- 步骤间的连接符 -->
                    <div v-if="stepIndex < eventSteps.length - 1" 
                         class="step-connector"
                         @click="toggleStepConnector(stepIndex)">
                      <div class="connector-btn" :class="step.connector">
                        {{ step.connector === 'indirectly' ? 'is indirectly followed by' : 
                           step.connector === 'directly' ? 'is directly followed by' : 
                           step.connector === 'and' ? 'And' : 'Or' }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 添加步骤按钮 -->
                <div class="add-step-btn" @click="addEventStep">
                  <i class="plus-icon"></i>
                  <span>添加步骤</span>
                </div>
              </div>
            </div>

            <!-- 包含区域的操作按钮 -->
            <div class="selection-actions">
              <button class="action-btn" @click="addConditionGroup">
                <i class="plus-icon"></i>
                新增包含组
              </button>
              <button v-if="!hasFileUpload" class="action-btn" @click="addFileUpload">
                <i class="upload-icon"></i>
                添加客群文件
              </button>
              <button v-if="!hasTemplate" class="action-btn" @click="addTemplate">
                <i class="template-icon"></i>
                组合条件模版
              </button>
              <button v-if="!hasEventSequence" class="action-btn" @click="addEventSequence">
                <i class="event-icon"></i>
                事件圈人
              </button>
            </div>
          </div>

          <!-- 分隔线 -->
          <div class="section-divider">
            <div class="divider-line"></div>
          </div>

          <!-- 排除功能区 -->
          <div class="selection-content">
            <!-- 排除条件组 -->
            <div v-for="(group, groupIndex) in excludeGroups" 
                 :key="groupIndex" 
                 class="condition-group exclude">
              <div class="condition-header">
                <span class="icon-text">
                  <i class="user-icon"></i>
                  排除符合以下条件的客群：
                </span>
                <i class="delete-icon" @click="deleteExcludeGroup(groupIndex)"></i>
              </div>
              
              <!-- 规则集合容器 -->
              <div class="rules-container">
                <!-- 规则集合 -->
                <template v-for="(ruleSet, setIndex) in group.ruleSets" :key="setIndex">
                  <div class="rule-set">
                    <!-- 规则集合内的规则 -->
                    <div class="condition-items">
                      <template v-for="(rule, ruleIndex) in ruleSet.rules" :key="ruleIndex">
                        <!-- 单条规则 -->
                        <div class="rule-item">
                          <div class="rule-content">
                            <div class="field-select">
                              <span>{{ rule.field }}</span>
                              <i class="triangle-icon"></i>
                            </div>
                            <div class="operator-select">
                              <button class="operator-btn">
                                <span>{{ rule.operator }}</span>
                                <i class="triangle-icon"></i>
                              </button>
                            </div>
                            <div class="value-tags">
                              <div class="tag" v-for="(value, vIndex) in rule.values" :key="vIndex">
                                <span>{{ value }}</span>
                                <i class="close-icon"></i>
                              </div>
                            </div>
                            <div class="rule-actions">
                              <button v-if="ruleIndex === ruleSet.rules.length - 1" 
                                      class="add-btn"
                                      @click="addExcludeRule(setIndex)">+</button>
                              <i class="delete-icon" @click="deleteExcludeRule(setIndex, ruleIndex)"></i>
                            </div>
                          </div>
                        </div>

                        <!-- 规则间的连接符 -->
                        <div v-if="ruleIndex < ruleSet.rules.length - 1" 
                             class="connector" 
                             @click="toggleExcludeConnector(setIndex, ruleIndex)">
                          <div class="dashed-line"></div>
                          <div class="connector-btn" :class="rule.connector">
                            {{ rule.connector === 'and' ? '且' : 
                               rule.connector === 'or' ? '或' : '非' }}
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>

                  <!-- 规则集合间的连接符 -->
                  <div v-if="setIndex < group.ruleSets.length - 1" 
                       class="set-connector" 
                       @click="toggleExcludeSetConnector(setIndex)">
                    <div class="dashed-line"></div>
                    <div class="connector-btn" :class="ruleSet.connector">
                      {{ ruleSet.connector === 'and' ? '且' : 
                         ruleSet.connector === 'or' ? '或' : '非' }}
                    </div>
                  </div>
                </template>
              </div>

              <!-- 在条件区底部添加新增规则集合的按钮 -->
              <div class="condition-footer">
                <button class="add-btn" @click="addExcludeRuleSet(groupIndex)">+</button>
              </div>
            </div>
            
            <!-- 排除文件上传区域 -->
            <div v-if="showExcludeFileUpload" class="file-upload exclude">
              <div class="upload-header">
                <span class="icon-text">
                  <i class="file-icon"></i>
                  添加客群文件
                </span>
                <div class="header-actions">
                  <button class="download-btn" @click="downloadExcludeTemplate">
                    <i class="download-icon"></i>
                    下载模板
                  </button>
                  <i class="delete-icon" @click="deleteExcludeFileUpload"></i>
                </div>
              </div>
              
              <div class="upload-content" 
                   @click="handleExcludeUploadClick" 
                   @drop.prevent="handleExcludeDrop" 
                   @dragover.prevent
                   :class="{ 'no-more': excludeFiles.length >= 4 }">
                <div class="files-container">
                  <!-- 已上传文件列表 -->
                  <div v-for="(file, index) in excludeFiles" 
                       :key="index" 
                       class="file-card">
                    <div class="file-info">
                      <i class="excel-icon"></i>
                      <div class="file-text">
                        <span class="file-name">{{ file.name }}</span>
                        <span class="file-count">文件包含<span class="number">{{ file.count }}</span>条数据</span>
                      </div>
                    </div>
                    <i class="delete-icon" @click.stop="deleteExcludeFile(index)"></i>
                  </div>

                  <!-- 上传提示文字，仅在文件数量小于4时显示 -->
                  <div v-if="excludeFiles.length < 4" class="upload-hint">
                    点击/拖动到此上传文件
                  </div>
                </div>

                <!-- 隐藏的文件输入框 -->
                <input type="file" 
                       ref="excludeFileInput" 
                       style="display: none" 
                       @change="handleExcludeFileChange"
                       accept=".xlsx,.xls">
              </div>
            </div>

            <!-- 剔除条件模版区域 -->
            <div v-if="showExcludeTemplateArea" class="template-area exclude">
              <div class="template-header">
                <span class="icon-text">
                  <i class="template-icon"></i>
                  剔除条件模版
                </span>
                <i class="delete-icon" @click="deleteExcludeTemplateArea"></i>
              </div>
              
              <div class="template-content">
                <!-- 选择器 -->
                <div class="template-select" 
                     @click="showExcludeTemplateList = !showExcludeTemplateList">
                  <span :class="{ 'selected': excludedTemplates.length > 0 }">
                    {{ excludedTemplates.length > 0 ? `已选择 ${excludedTemplates.length} 个模版` : '请选择' }}
                  </span>
                  <i class="triangle-icon"></i>
                  
                  <!-- 模版列表下拉框 -->
                  <div v-if="showExcludeTemplateList" class="template-list">
                    <div v-for="template in excludeTemplates" 
                         :key="template.id" 
                         class="template-item"
                         :class="{ 'selected': isExcludeTemplateSelected(template) }"
                         @click.stop="toggleExcludeTemplate(template)">
                      <i class="checkbox-icon"></i>
                      {{ template.name }}
                    </div>
                  </div>
                </div>

                <!-- 已选模版展示区 -->
                <div v-if="excludedTemplates.length > 0" class="selected-templates">
                  <div v-for="template in excludedTemplates" 
                       :key="template.id"
                       class="selected-template-card"
                       @mouseenter="showExcludePreviewForTemplate(template, $event)"
                       @mouseleave="startExcludeHidePreview">
                    <div class="template-info">
                      <span class="template-name">{{ template.name }}</span>
                      <i class="delete-icon" @click.stop="removeExcludeTemplate(template)"></i>
                    </div>
                    
                    <!-- 预览框和安全区域 -->
                    <div v-if="excludePreviewTemplate === template" 
                         class="preview-wrapper"
                         :style="excludePreviewPosition"
                         @mouseenter="cancelExcludeHidePreview"
                         @mouseleave="startExcludeHidePreview">
                      <div class="template-preview">
                        <div class="preview-title">条件组合预览</div>
                        <div class="preview-content">
                          <!-- 包含条件 -->
                          <div class="preview-section include">
                            <div class="section-label">包含以下客群：</div>
                            <template v-for="(group, groupIndex) in template.conditions" :key="groupIndex">
                              <div class="preview-group">
                                <template v-for="(ruleSet, setIndex) in group.ruleSets" :key="setIndex">
                                  <div class="rule-set">
                                    <template v-for="(rule, ruleIndex) in ruleSet.rules" :key="ruleIndex">
                                      <div class="rule-line">
                                        {{ rule.field }}
                                        <span class="operator">{{ rule.operator }}</span>
                                        <span class="values">{{ rule.values.join('、') }}</span>
                                        <span v-if="ruleIndex < ruleSet.rules.length - 1" 
                                              class="text-connector">
                                          {{ rule.connector === 'and' ? '且' : 
                                             rule.connector === 'or' ? '或' : '非' }}
                                        </span>
                                      </div>
                                    </template>
                                  </div>
                                  <div v-if="setIndex < group.ruleSets.length - 1" 
                                       class="text-connector set-connector">
                                    {{ ruleSet.connector === 'and' ? '且' : 
                                       ruleSet.connector === 'or' ? '或' : '非' }}
                                  </div>
                                </template>
                              </div>
                              <div v-if="groupIndex < template.conditions.length - 1" 
                                   class="text-connector group-connector">
                                或
                              </div>
                            </template>
                          </div>
                          
                          <!-- 排除条件 -->
                          <div v-if="template.excludeConditions" class="preview-section exclude">
                            <div class="section-label">排除以下客群：</div>
                            <template v-for="(group, groupIndex) in template.excludeConditions" :key="groupIndex">
                              <div class="preview-group">
                                <template v-for="(ruleSet, setIndex) in group.ruleSets" :key="setIndex">
                                  <div class="rule-set">
                                    <template v-for="(rule, ruleIndex) in ruleSet.rules" :key="ruleIndex">
                                      <div class="rule-line">
                                        {{ rule.field }}
                                        <span class="operator">{{ rule.operator }}</span>
                                        <span class="values">{{ rule.values.join('、') }}</span>
                                        <span v-if="ruleIndex < ruleSet.rules.length - 1" 
                                              class="text-connector">
                                          {{ rule.connector === 'and' ? '且' : 
                                             rule.connector === 'or' ? '或' : '非' }}
                                        </span>
                                      </div>
                                    </template>
                                  </div>
                                  <div v-if="setIndex < group.ruleSets.length - 1" 
                                       class="text-connector set-connector">
                                    {{ ruleSet.connector === 'and' ? '且' : 
                                       ruleSet.connector === 'or' ? '或' : '非' }}
                                  </div>
                                </template>
                              </div>
                              <div v-if="groupIndex < template.excludeConditions.length - 1" 
                                   class="text-connector group-connector">
                                或
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 排除区域的操作按钮 -->
            <div class="selection-actions exclude">
              <button class="action-btn" @click="addExcludeGroup">
                <i class="plus-icon"></i>
                新增排除组
              </button>
              <button v-if="!hasExcludeFileUpload" 
                      class="action-btn" 
                      @click="addExcludeFileUpload">
                <i class="upload-icon"></i>
                排除客群文件
              </button>
              <button v-if="!hasExcludeTemplate" 
                      class="action-btn" 
                      @click="addExcludeTemplate">
                <i class="template-icon"></i>
                剔除条件模版
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右列 - 客群快照和客户画像 -->
      <div class="right-column">
        <!-- 客群快照 -->
        <div class="snapshot">
          <div class="section-title">
            <div class="green-bar"></div>
            <span>客群快照</span>
          </div>
          
          <div class="snapshot-content">
            <div class="update-time">
              <span>更新时间</span>
              <div class="radio-group">
                <label class="radio-item">
                  <input type="radio" name="updateType" value="once" checked>
                  <span>一次性</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="updateType" value="periodic">
                  <span>周期性</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 客户画像 -->
        <div class="customer-portrait">
          <div class="section-title">
            <div class="green-bar"></div>
            <span>客户画像</span>
            <span class="refresh">刷新</span>
          </div>
          
          <div class="portrait-content">
            <div class="total-info">
              <div class="info-item">
                <div class="label">选中客户总数</div>
                <div class="number">1510,219</div>
              </div>
              <div class="progress-info">
                <div class="label">选中客户占比总客户</div>
                <div class="progress-bar">
                  <div class="progress" style="width: 45%"></div>
                </div>
                <span class="percentage">45%</span>
              </div>
            </div>

            <div class="stats-grid">
              <div class="stats-item">
                <div class="label">userid</div>
                <div class="value">1510,012</div>
              </div>
              <div class="stats-item">
                <div class="label">email</div>
                <div class="value">1510,012</div>
              </div>
              <div class="stats-item">
                <div class="label">手机号</div>
                <div class="value">1510,012</div>
              </div>
              <div class="stats-item">
                <div class="label">push opt-out</div>
                <div class="value">1510,012</div>
              </div>
              <div class="stats-item">
                <div class="label">EDM opt-out</div>
                <div class="value">1510,012</div>
              </div>
              <div class="stats-item">
                <div class="label">SMS opt-out</div>
                <div class="value">1510,012</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="footer">
      <button class="btn-cancel">取消</button>
      <button class="btn-confirm">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerGroup',
  data() {
    return {
      form: {
        customerType: 'company',
        name: '',
        description: '',
        system: '',
        updateType: 'once'
      },
      // 添加文件上传相关的数据
      uploadedFiles: [
        {
          name: '客户添加模板.xlsx',
          count: 9489
        }
      ],
      // 条件区列表
      conditionGroups: [
        {
          // 规则集合列表
          ruleSets: [
            {
              connector: 'and', // 规则集合之间的连接符
              rules: [
                {
                  field: '客户开户类型',
                  operator: '包含',
                  values: ['MCV', 'HK'],
                  connector: 'and'
                },
                {
                  field: '账户状态',
                  operator: '包含',
                  values: ['A00正常', 'A20不活跃用户'],
                  connector: 'and'
                }
              ]
            },
            {
              connector: 'or',
              rules: [
                {
                  field: '用户ID',
                  operator: '包含',
                  values: ['21083921048910']
                }
              ]
            }
          ]
        }
      ],
      hasFileUpload: false, // 是否已有文件上传区域
      showFileUpload: true, // 控制文件上传区域的显示
      hasTemplate: false,  // 是否已有组合条件模版
      showTemplateArea: false,  // 控制组合条件模版区域的显示
      selectedTemplates: [],
      showTemplateList: false,
      previewTemplate: null,
      previewPosition: null,
      templates: [
        {
          id: 1,
          name: '高价值潜力客户',
          creator: '张三',
          team: '客户运营组',
          conditions: [
            {
              ruleSets: [
                {
                  connector: 'and',
                  rules: [
                    {
                      field: '客户等级',
                      operator: '包含',
                      values: ['白银', '黄金'],
                      connector: 'and'
                    },
                    {
                      field: '账户余额',
                      operator: '区间',
                      values: ['50000', '200000'],
                      connector: 'and'
                    },
                    {
                      field: '开户时间',
                      operator: '大于',
                      values: ['180天'],
                      connector: 'and'
                    }
                  ]
                },
                {
                  connector: 'or',
                  rules: [
                    {
                      field: '月交易频次',
                      operator: '大于',
                      values: ['8次'],
                      connector: 'and'
                    },
                    {
                      field: '单笔交易金额',
                      operator: '大于',
                      values: ['10000'],
                      connector: 'or'
                    },
                    {
                      field: '交易品类',
                      operator: '包含',
                      values: ['基金', '理财', '保险'],
                      connector: 'and'
                    }
                  ]
                }
              ]
            },
            {
              ruleSets: [
                {
                  connector: 'and',
                  rules: [
                    {
                      field: '年龄段',
                      operator: '区间',
                      values: ['30', '50'],
                      connector: 'and'
                    },
                    {
                      field: '职业类型',
                      operator: '包含',
                      values: ['企业主', '高管', '金融从业者'],
                      connector: 'and'
                    }
                  ]
                },
                {
                  connector: 'or',
                  rules: [
                    {
                      field: '年收入',
                      operator: '大于',
                      values: ['50万'],
                      connector: 'and'
                    },
                    {
                      field: '资产规模',
                      operator: '大于',
                      values: ['200万'],
                      connector: 'and'
                    }
                  ]
                },
                {
                  connector: 'and',
                  rules: [
                    {
                      field: '风险承受能力',
                      operator: '大于等于',
                      values: ['进取型'],
                      connector: 'and'
                    },
                    {
                      field: '投资经验',
                      operator: '大于',
                      values: ['3年'],
                      connector: 'and'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: '高活跃度客户',
          creator: '李四',
          team: '风控组',
          conditions: [
            {
              ruleSets: [
                {
                  connector: 'and',
                  rules: [
                    {
                      field: '月交易频次',
                      operator: '大于',
                      values: ['10次'],
                      connector: 'and'
                    },
                    {
                      field: '最近登录',
                      operator: '小于',
                      values: ['7天'],
                      connector: 'or'
                    },
                    {
                      field: '客户来源',
                      operator: '不包含',
                      values: ['第三方引流'],
                      connector: 'and'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 3,
          name: '潜在价值客户',
          creator: '王五',
          team: '营销组',
          conditions: [
            {
              ruleSets: [
                {
                  connector: 'and',
                  rules: [
                    {
                      field: '年龄段',
                      operator: '区间',
                      values: ['25', '35'],
                      connector: 'and'
                    },
                    {
                      field: '职业',
                      operator: '包含',
                      values: ['金融', 'IT', '互联网'],
                      connector: 'and'
                    }
                  ]
                },
                {
                  connector: 'or',
                  rules: [
                    {
                      field: '月收入',
                      operator: '大于',
                      values: ['20000'],
                      connector: 'and'
                    },
                    {
                      field: '信用评分',
                      operator: '大于',
                      values: ['700'],
                      connector: 'and'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: '高风险客户排查',
          creator: '赵六',
          team: '风控组',
          conditions: [
            {
              // 包含条件组
              ruleSets: [
                {
                  connector: 'and',
                  rules: [
                    {
                      field: '客户等级',
                      operator: '包含',
                      values: ['钻石', '白金'],
                      connector: 'and'
                    },
                    {
                      field: '资产规模',
                      operator: '大于',
                      values: ['500万'],
                      connector: 'and'
                    }
                  ]
                }
              ]
            }
          ],
          excludeConditions: [  // 新增排除条件
            {
              ruleSets: [
                {
                  connector: 'and',
                  rules: [
                    {
                      field: '风险评级',
                      operator: '包含',
                      values: ['低风险', '中低风险'],
                      connector: 'and'
                    },
                    {
                      field: '合规标签',
                      operator: '包含',
                      values: ['无异常', '已完成尽调'],
                      connector: 'and'
                    }
                  ]
                },
                {
                  connector: 'or',
                  rules: [
                    {
                      field: '黑名单标记',
                      operator: '不包含',
                      values: ['可疑交易', '涉嫌洗钱'],
                      connector: 'and'
                    },
                    {
                      field: '监管报送',
                      operator: '等于',
                      values: ['正常'],
                      connector: 'and'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      hidePreviewTimer: null,
      excludeGroups: [], // 排除条件组
      hasExcludeFileUpload: false,
      showExcludeFileUpload: false,
      excludeFiles: [],
      hasExcludeTemplate: false,
      showExcludeTemplateArea: false,
      excludedTemplates: [],
      excludePreviewTemplate: null,
      excludePreviewPosition: null,
      hideExcludePreviewTimer: null,
      templateSearch: {
        creator: '',
        team: '',
        name: ''
      },
      eventSteps: [],
      eventOptions: [
        { label: 'app_clear_data', value: 'app_clear_data' },
        { label: 'first_open', value: 'first_open' },
        { label: 'purchase', value: 'purchase' },
        { label: 'page_view', value: 'page_view' },
        { label: 'sign_up', value: 'sign_up' },
        { label: 'checkout', value: 'checkout' },
        { label: 'search', value: 'search' },
        { label: 'add_to_cart', value: 'add_to_cart' },
        { label: 'login', value: 'login' }
      ],
      operatorOptions: [
        { label: '包含', value: 'contains' },
        { label: '等于', value: 'equals' },
        { label: '大于', value: 'greater_than' },
        { label: '小于', value: 'less_than' },
        { label: '区间', value: 'between' },
        { label: '不包含', value: 'not_contains' }
      ],
      showEventSequence: false,
      hasEventSequence: false
    }
  },
  computed: {
    // 根据搜索条件过滤模版
    filteredTemplates() {
      return this.templates.filter(template => {
        const nameMatch = template.name.toLowerCase().includes(this.templateSearch.name.toLowerCase());
        const creatorMatch = template.creator.includes(this.templateSearch.creator);
        const teamMatch = template.team.includes(this.templateSearch.team);
        return nameMatch && creatorMatch && teamMatch;
      });
    }
  },
  methods: {
    // 切换规则之间的连接符
    toggleConnector(ruleSetIndex, ruleIndex) {
      const connectors = ['and', 'or', 'not'];
      const rule = this.conditionGroups[0].ruleSets[ruleSetIndex].rules[ruleIndex];
      const currentIndex = connectors.indexOf(rule.connector);
      const nextIndex = (currentIndex + 1) % connectors.length;
      rule.connector = connectors[nextIndex];
    },
    // 切换规则集合之间的连接符
    toggleSetConnector(setIndex) {
      const connectors = ['and', 'or', 'not'];
      const ruleSet = this.conditionGroups[0].ruleSets[setIndex];
      const currentIndex = connectors.indexOf(ruleSet.connector);
      const nextIndex = (currentIndex + 1) % connectors.length;
      ruleSet.connector = connectors[nextIndex];
    },
    // 添加新规则
    addRule(setIndex) {
      // 实现添加新规则的逻辑
    },
    // 添加新规则集合
    addRuleSet(groupIndex) {
      // 实现添加新规则集合的逻辑
    },
    // 删除规则
    deleteRule(setIndex, ruleIndex) {
      // 实现删除规则的逻辑
    },
    // 删除条件区
    deleteConditionGroup(groupIndex) {
      this.conditionGroups.splice(groupIndex, 1);
    },
    // 处理上传点击
    handleUploadClick() {
      if (this.uploadedFiles.length >= 4) return;
      this.$refs.fileInput.click();
    },
    // 处理文件选择
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && this.uploadedFiles.length < 4) {
        // 这里可以添加文件验证逻辑
        this.uploadedFiles.push({
          name: file.name,
          count: 0 // 实际应该解析文件获取数据条数
        });
      }
      // 清空input的值，允许重复选择同一个文件
      event.target.value = '';
    },
    // 处理文件拖放
    handleDrop(event) {
      if (this.uploadedFiles.length >= 4) return;
      const file = event.dataTransfer.files[0];
      if (file && file.name.match(/\.(xlsx|xls)$/i)) {
        this.uploadedFiles.push({
          name: file.name,
          count: 0 // 实际应该解析文件获取数据条数
        });
      }
    },
    // 删除文件
    deleteFile(index) {
      this.uploadedFiles.splice(index, 1);
    },
    // 下载模板
    downloadTemplate() {
      // 实现下载模板逻辑
      console.log('下载模板');
    },
    // 添加新的条件组
    addConditionGroup() {
      this.conditionGroups.push({
        ruleSets: [
          {
            connector: 'and',
            rules: [
              {
                field: '请选择',
                operator: '包含',
                values: [],
                connector: 'and'
              }
            ]
          }
        ]
      });
    },
    // 添加文件上传区域
    addFileUpload() {
      this.hasFileUpload = true;
      this.showFileUpload = true;  // 显示文件上传区域
      // 初始化文件上传区域的数据
      this.uploadedFiles = [];
    },
    // 删除整个文件上传区域
    deleteFileUpload() {
      this.showFileUpload = false;
      this.hasFileUpload = false; // 允许重新添加文件上传区域
    },
    // 添加组合条件模版区域
    addTemplate() {
      this.hasTemplate = true;
      this.showTemplateArea = true;
    },
    // 删除组合条件模版区域
    deleteTemplateArea() {
      this.showTemplateArea = false;
      this.hasTemplate = false;  // 允许重新添加模版区域
    },
    // 选择模板
    toggleTemplate(template) {
      const index = this.selectedTemplates.findIndex(t => t.id === template.id);
      if (index > -1) {
        this.selectedTemplates.splice(index, 1);
      } else {
        this.selectedTemplates.push(template);
      }
    },
    // 移除模板
    removeTemplate(template) {
      const index = this.selectedTemplates.findIndex(t => t.id === template.id);
      if (index > -1) {
        this.selectedTemplates.splice(index, 1);
      }
    },
    // 判断模板是否被选中
    isTemplateSelected(template) {
      return this.selectedTemplates.some(t => t.id === template.id);
    },
    // 应用所有选中的模版
    applySelectedTemplates() {
      // 将所有选中模版的条件组合并
      const newGroups = this.selectedTemplates.flatMap(template => 
        template.conditions.map(condition => ({
          ruleSets: condition.ruleSets.map(ruleSet => ({...ruleSet}))
        }))
      );
      
      // 替换现有的条件组
      this.conditionGroups = newGroups;
    },
    // 显示预览
    showPreviewForTemplate(template, event) {
      if (this.hidePreviewTimer) {
        clearTimeout(this.hidePreviewTimer);
        this.hidePreviewTimer = null;
      }
      
      this.previewTemplate = template;
      
      // 计算预览框位置
      const rect = event.target.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const previewWidth = 360; // 使用较小的预览框宽度
      
      // 计算左侧位置，优先显示在右侧
      let left = rect.right + 8; // 添加小间距
      if (left + previewWidth > viewportWidth - 16) { // 考虑右侧安全距离
        left = rect.left - previewWidth - 8; // 改为左侧显示
      }
      
      // 计算顶部位置，确保预览框在视口内
      let top = rect.top;
      const viewportHeight = window.innerHeight;
      const previewHeight = 400; // 预估的预览框高度
      
      if (top + previewHeight > viewportHeight - 16) {
        top = Math.max(16, viewportHeight - previewHeight - 16); // 确保不超出顶部
      }
      
      this.previewPosition = {
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`
      };
    },
    // 开始隐藏预览的倒计时
    startHidePreview() {
      if (this.hidePreviewTimer) {
        clearTimeout(this.hidePreviewTimer);
      }
      this.hidePreviewTimer = setTimeout(() => {
        this.hidePreview();
      }, 200);  // 200ms的延迟
    },
    // 取消隐藏预览
    cancelHidePreview() {
      if (this.hidePreviewTimer) {
        clearTimeout(this.hidePreviewTimer);
        this.hidePreviewTimer = null;
      }
    },
    // 隐藏预览
    hidePreview() {
      this.previewTemplate = null;
      this.previewPosition = null;
      this.hidePreviewTimer = null;
    },
    // 排除区域的方法与包含区域类似，只是操作不同的数据
    addExcludeGroup() {
      this.excludeGroups.push({
        ruleSets: [
          {
            connector: 'and',
            rules: [
              {
                field: '请选择',
                operator: '包含',
                values: [],
                connector: 'and'
              }
            ]
          }
        ]
      });
    },
    
    addExcludeFileUpload() {
      this.hasExcludeFileUpload = true;
      this.showExcludeFileUpload = true;
      this.excludeFiles = [];
    },
    
    addExcludeTemplate() {
      this.hasExcludeTemplate = true;
      this.showExcludeTemplateArea = true;
    },
    // 处理排除上传点击
    handleExcludeUploadClick() {
      if (this.excludeFiles.length >= 4) return;
      this.$refs.excludeFileInput.click();
    },
    // 处理排除文件选择
    handleExcludeFileChange(event) {
      const file = event.target.files[0];
      if (file && this.excludeFiles.length < 4) {
        this.excludeFiles.push({
          name: file.name,
          count: 0
        });
      }
      event.target.value = '';
    },
    // 处理文件拖放
    handleExcludeDrop(event) {
      if (this.excludeFiles.length >= 4) return;
      const file = event.dataTransfer.files[0];
      if (file && file.name.match(/\.(xlsx|xls)$/i)) {
        this.excludeFiles.push({
          name: file.name,
          count: 0
        });
      }
    },
    // 删除排除文件
    deleteExcludeFile(index) {
      this.excludeFiles.splice(index, 1);
    },
    // 下载排除模板
    downloadExcludeTemplate() {
      // 实现下载排除模板逻辑
      console.log('下载排除模板');
    },
    // 删除排除模板
    deleteExcludeTemplateArea() {
      this.showExcludeTemplateArea = false;
      this.hasExcludeTemplate = false;  // 允许重新添加模版区域
    },
    // 选择排除模板
    toggleExcludeTemplate(template) {
      const index = this.excludedTemplates.findIndex(t => t.id === template.id);
      if (index > -1) {
        this.excludedTemplates.splice(index, 1);
      } else {
        this.excludedTemplates.push(template);
      }
    },
    // 移除排除模板
    removeExcludeTemplate(template) {
      const index = this.excludedTemplates.findIndex(t => t.id === template.id);
      if (index > -1) {
        this.excludedTemplates.splice(index, 1);
      }
    },
    // 判断排除模板是否被选中
    isExcludeTemplateSelected(template) {
      return this.excludedTemplates.some(t => t.id === template.id);
    },
    // 显示排除预览
    showExcludePreviewForTemplate(template, event) {
      if (this.hideExcludePreviewTimer) {
        clearTimeout(this.hideExcludePreviewTimer);
        this.hideExcludePreviewTimer = null;
      }
      
      this.excludePreviewTemplate = template;
      
      // 计算预览框位置
      const rect = event.target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const previewWidth = 480;
      
      // 计算左侧位置，优先显示在右侧
      let left = rect.right;  // 移除额外的padding
      if (left + previewWidth + 32 > viewportWidth) {  // 考虑安全区域的padding
        left = rect.left - previewWidth - 32;  // 左侧显示时也考虑padding
      }
      
      // 计算顶部位置
      let top = rect.top;
      if (top < 16) {
        top = 16;
      }
      
      this.excludePreviewPosition = {
        top: `${top}px`,
        left: `${left}px`,
        width: `${previewWidth}px`
      };
    },
    // 开始隐藏排除预览的倒计时
    startExcludeHidePreview() {
      if (this.hideExcludePreviewTimer) {
        clearTimeout(this.hideExcludePreviewTimer);
      }
      this.hideExcludePreviewTimer = setTimeout(() => {
        this.hideExcludePreview();
      }, 200);  // 200ms的延迟
    },
    // 取消隐藏排除预览
    cancelExcludeHidePreview() {
      if (this.hideExcludePreviewTimer) {
        clearTimeout(this.hideExcludePreviewTimer);
        this.hideExcludePreviewTimer = null;
      }
    },
    // 隐藏排除预览
    hideExcludePreview() {
      this.excludePreviewTemplate = null;
      this.excludePreviewPosition = null;
      this.hideExcludePreviewTimer = null;
    },
    // 搜索模板
    searchTemplates() {
      // 实时过滤，不需要额外处理，computed属性会自动更新
    },
    // 添加事件步骤
    addEventStep() {
      this.eventSteps.push({
        event: '',
        conditions: [
          {
            operator: '包含',
            value: '',
            type: 'text'
          }
        ],
        connector: 'indirectly',
        showEventDropdown: false
      });
    },
    // 移除事件步骤
    removeEventStep(index) {
      this.eventSteps.splice(index, 1);
    },
    // 切换事件选择
    toggleEventDropdown(index) {
      this.eventSteps[index].showEventDropdown = !this.eventSteps[index].showEventDropdown;
    },
    // 选择事件
    selectEvent(index, event) {
      this.eventSteps[index].event = event.label;
      this.eventSteps[index].showEventDropdown = false;
    },
    // 添加新条件
    addCondition(stepIndex) {
      this.eventSteps[stepIndex].conditions.push({
        operator: '包含',
        value: '',
        type: 'text'
      });
    },
    // 添加参数
    addParameter(stepIndex, conditionIndex) {
      // 在特定条件下添加参数的逻辑
    },
    // 移除条件
    removeCondition(stepIndex, conditionIndex) {
      this.eventSteps[stepIndex].conditions.splice(conditionIndex, 1);
      if (this.eventSteps[stepIndex].conditions.length === 0) {
        // 如果没有条件,添加一个默认条件
        this.eventSteps[stepIndex].conditions.push({
          operator: '包含',
          value: '',
          type: 'text'
        });
      }
    },
    // 切换步骤连接符
    toggleStepConnector(index) {
      const connectors = ['indirectly', 'directly', 'and', 'or'];
      const rule = this.eventSteps[index];
      const currentIndex = connectors.indexOf(rule.connector);
      const nextIndex = (currentIndex + 1) % connectors.length;
      rule.connector = connectors[nextIndex];
    },
    // 切换参数连接符
    toggleParamConnector(stepIndex, paramIndex) {
      const param = this.eventSteps[stepIndex].conditions[paramIndex];
      param.connector = param.connector === 'and' ? 'or' : 'and';
    },
    // 添加事件序列区域
    addEventSequence() {
      this.hasEventSequence = true;
      this.showEventSequence = true;
      if (this.eventSteps.length === 0) {
        // 默认添加两个步骤,每个步骤有多个参数条件
        this.eventSteps = [
          {
            event: 'app_clear_data',
            conditions: [
              {
                operator: '包含',
                value: 'qqw',
                type: 'text'
              }
            ],
            connector: 'indirectly',
            showEventDropdown: false
          },
          {
            event: 'first_open',
            conditions: [
              {
                operator: '大于',
                value: '0',
                type: 'number'
              }
            ],
            connector: 'indirectly',
            showEventDropdown: false
          }
        ];
      }
    },
    // 删除事件序列区域
    deleteEventSequence() {
      this.showEventSequence = false;
    }
  },
  mounted() {
    // 初始化事件序列,默认添加一个步骤
    this.eventSteps = [
      {
        event: 'app_clear_data',
        conditions: [
          {
            operator: '包含',
            value: 'qqw',
            type: 'text'
          }
        ],
        connector: 'indirectly',
        showEventDropdown: false
      }
    ];
    
    // 添加事件圈人部分
    this.hasEventSequence = true;
    this.showEventSequence = true;
  }
}
</script>

<style src="./index.css"></style> 