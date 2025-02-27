<template>
  <div class="main-container">
    <div class="frame">
      <div class="frame-1">
        <div class="page-header">
          <div class="image"></div>
          <span class="create-customer-group">创建客群</span>
        </div>
      </div>
    </div>
    <div class="frame-2">
      <div class="snapshot-settings-not-open">
        <div class="customer-group-management-title">
          <div class="rectangle"></div>
          <span class="basic-information">基本信息</span>
        </div>
        <div class="frame-3">
          <div class="search-box">
            <div class="customer-type">
              <span class="required">*</span
              ><span class="customer-type-4">客户类型：</span>
            </div>
            <div class="frame-5">
              <div class="frame-6">
                <div class="frame-7"></div>
                <span class="retail-customer">零售客户</span>
              </div>
              <div class="frame-8">
                <div class="frame-9"></div>
                <span class="corporate-customer">对公客户</span>
              </div>
              <div class="frame-a">
                <div class="frame-b"><div class="ellipse"></div></div>
                <span class="corporate-company">对公公司</span>
              </div>
            </div>
          </div>
          <div class="search-box-c">
            <div class="customer-group-name">
              <span class="required-d">*</span
              ><span class="customer-group-name-e">客群名称：</span>
            </div>
            <div class="input">
              <input class="select" /><span class="search-box-f">请选择</span>
            </div>
          </div>
          <div class="customer-group-description">
            <span class="customer-group-description-10">客群描述：</span>
            <div class="input-11">
              <input class="select-12" /><span class="search-box-13"
                >请选择</span
              >
            </div>
          </div>
          <div class="system-usage">
            <span class="system-usage-14">使用系统：</span>
            <div class="input-15">
              <input class="select-16" /><span class="frame-17">请选择</span>
            </div>
          </div>
        </div>
      </div>
      <div class="frame-18">
        <div class="initial-version">
          <div class="customer-group-management-title-19">
            <div class="rectangle-1a"></div>
            <span class="customer-group-selection-1b">客群圈选</span>
          </div>
          <div class="frame-1c">
            <div class="frame-1d">
              <div class="frame-1e">
                <div class="frame-1f">
                  <div class="frame-20">
                    <div class="image-21"></div>
                    <span class="include-customer-group"
                      >包含符合以下条件的客群:</span
                    >
                  </div>
                  <div class="image-22"></div>
                </div>
                <div class="frame-23">
                  <div class="frame-24">
                    <div class="frame-25">
                      <div class="frame-26">
                        <div class="frame-27">
                          <span class="customer-account-type"
                            >客户开户类型</span
                          >
                          <div class="image-28"></div>
                        </div>
                        <div class="frame-29">
                          <button class="button">
                            <span class="include">包含</span>
                            <div class="image-2a"></div>
                          </button>
                        </div>
                        <div class="frame-2b">
                          <div class="frame-2c">
                            <button class="button-2d">
                              <span class="mcv">MCV</span>
                              <div class="image-2e"></div></button
                            ><button class="button-2f">
                              <span class="hk">HK</span>
                              <div class="image-30"></div>
                            </button>
                          </div>
                          <div class="frame-31">
                            <div class="frame-32">
                              <span class="or">或</span>
                            </div>
                            <div class="image-33"></div>
                          </div>
                        </div>
                      </div>
                      <div class="group">
                        <button class="button-34">
                          <span class="and">且</span>
                        </button>
                        <div class="vector"></div>
                      </div>
                      <div class="frame-35">
                        <div class="frame-36">
                          <span class="account-status">账户状态</span>
                          <div class="image-37"></div>
                        </div>
                        <div class="frame-38">
                          <button class="button-39">
                            <span class="include-3a">包含</span>
                            <div class="image-3b"></div>
                          </button>
                        </div>
                        <div class="frame-3c">
                          <div class="frame-3d">
                            <button class="button-3e">
                              <span class="a-normal">A00正常</span>
                              <div class="image-3f"></div></button
                            ><button class="button-40">
                              <span class="a-inactive-user">A20不活跃用户</span>
                              <div class="image-41"></div>
                            </button>
                          </div>
                          <div class="frame-42">
                            <div class="frame-43">
                              <span class="or-44">或</span>
                            </div>
                            <div class="image-45"></div>
                          </div>
                        </div>
                      </div>
                      <div class="group-46">
                        <button class="button-47">
                          <span class="and-48">且</span>
                        </button>
                        <div class="vector-49"></div>
                      </div>
                      <div class="frame-4a">
                        <div class="frame-4b">
                          <span class="account-status-4c">账户状态</span>
                          <div class="image-4d"></div>
                        </div>
                        <div class="frame-4e">
                          <button class="button-4f">
                            <span class="include-50">包含</span>
                            <div class="image-51"></div>
                          </button>
                        </div>
                        <div class="frame-52">
                          <div class="frame-53">
                            <button class="button-54">
                              <span class="a-normal-55">A00正常</span>
                              <div class="image-56"></div></button
                            ><button class="button-57">
                              <span class="a-inactive-user-58"
                                >A20不活跃用户</span
                              >
                              <div class="image-59"></div>
                            </button>
                          </div>
                          <div class="frame-5a">
                            <div class="frame-5b">
                              <span class="or-5c">或</span>
                            </div>
                            <div class="image-5d"></div>
                          </div>
                        </div>
                      </div>
                      <div class="group-5e">
                        <button class="button-5f">
                          <span class="and-60">且</span>
                        </button>
                        <div class="vector-61"></div>
                      </div>
                      <div class="frame-62">
                        <div class="frame-63">
                          <div class="user-id">
                            <span class="user-id-64">用户ID</span
                            ><span class="nbsp"> </span>
                          </div>
                          <div class="image-65"></div>
                        </div>
                        <div class="frame-66">
                          <button class="button-67">
                            <span class="include-68">包含</span>
                            <div class="image-69"></div>
                          </button>
                        </div>
                        <div class="frame-6a">
                          <div class="frame-6b">
                            <button class="button-6c">
                              <span class="text">21083921048910</span>
                              <div class="image-6d"></div></button
                            ><button class="button-6e">
                              <span class="text-6f">21083921048910</span>
                              <div class="image-70"></div>
                            </button>
                          </div>
                          <div class="frame-71">
                            <button class="button-72">
                              <div class="image-73"></div>
                            </button>
                            <div class="image-74"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="frame-75">
                      <div class="group-76">
                        <div class="vector-77"></div>
                        <div class="frame-78">
                          <span class="and-79">且</span>
                        </div>
                      </div>
                    </div>
                    <div class="frame-7a">
                      <div class="frame-7b">
                        <div class="frame-7c">
                          <span class="customer-account-type-7d"
                            >客户开户类型</span
                          >
                          <div class="image-7e"></div>
                        </div>
                        <div class="frame-7f">
                          <button class="frame-80">
                            <span class="contains">包含</span>
                            <div class="image-81"></div>
                          </button>
                        </div>
                        <div class="frame-82">
                          <div class="frame-83">
                            <button class="frame-84">
                              <span class="mcv-85">MCV</span>
                              <div class="image-86"></div></button
                            ><button class="frame-87">
                              <span class="hk-88">HK</span>
                              <div class="image-89"></div>
                            </button>
                          </div>
                          <div class="frame-8a">
                            <div class="frame-8b">
                              <span class="or-8c">或</span>
                            </div>
                            <div class="image-8d"></div>
                          </div>
                        </div>
                      </div>
                      <div class="group-8e">
                        <button class="condition-and-or-not">
                          <span class="and-8f">且</span>
                        </button>
                        <div class="vector-90"></div>
                      </div>
                      <div class="frame-91">
                        <div class="frame-92">
                          <div class="user-id-93">
                            <span class="user-id-94">用户ID</span
                            ><span class="nbsp-95"> </span>
                          </div>
                          <div class="image-96"></div>
                        </div>
                        <div class="frame-97">
                          <button class="frame-98">
                            <span class="frame-99">包含</span>
                            <div class="image-9a"></div>
                          </button>
                        </div>
                        <div class="frame-9b">
                          <div class="frame-9c">
                            <button class="frame-9d">
                              <span class="text-9e">21083921048910</span>
                              <div class="image-9f"></div></button
                            ><button class="frame-a0">
                              <span class="text-a1">21083921048910</span>
                              <div class="image-a2"></div>
                            </button>
                          </div>
                          <div class="frame-a3">
                            <button class="frame-a4">
                              <div class="image-a5"></div>
                            </button>
                            <div class="image-a6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="frame-a7">
                    <button class="frame-a8">
                      <div class="image-a9"></div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="frame-aa">
                <div class="group-ab">
                  <div class="vector-ac"></div>
                  <div class="frame-ad"><span class="and-ae">且</span></div>
                </div>
              </div>
              <div class="customer-group-file-upload">
                <div class="frame-af">
                  <div class="frame-b0">
                    <div class="image-b1"></div>
                    <span class="add-customer-group-file">添加客群文件</span>
                  </div>
                  <div class="image-b2"></div>
                </div>
                <div class="frame-b3">
                  <div class="frame-b4">
                    <div class="frame-b5">
                      <div class="frame-b6">
                        <div class="image-b7"></div>
                        <div class="customer-add-template">
                          <span class="customer-add-template-b8"
                            >客户添加模板</span
                          ><span class="xlsx">.xlsx</span>
                        </div>
                      </div>
                      <div class="image-b9"></div>
                    </div>
                    <div class="file-contains-data">
                      <span class="file-contains">文件包含</span
                      ><span class="text-ba">9489</span
                      ><span class="data">条数据</span>
                    </div>
                  </div>
                  <div class="frame-bb">
                    <div class="frame-bc">
                      <div class="frame-bd">
                        <div class="image-be"></div>
                        <div class="customer-add-template-bf">
                          <span class="customer-add-template-c0"
                            >客户添加模板</span
                          ><span class="xlsx-c1">.xlsx</span>
                        </div>
                      </div>
                      <div class="image-c2"></div>
                    </div>
                    <div class="file-include-data">
                      <span class="file-include">文件包含</span
                      ><span class="file-include-count">9489</span
                      ><span class="file-include-data-c3">条数据</span>
                    </div>
                  </div>
                  <div class="frame-c4">
                    <div class="frame-c5">
                      <div class="frame-c6">
                        <div class="image-c7"></div>
                        <div class="client-template">
                          <span class="client-template-c8">客户添加模板</span
                          ><span class="file-extension">.xlsx</span>
                        </div>
                      </div>
                      <div class="image-c9"></div>
                    </div>
                    <div class="file-include-data-ca">
                      <span class="file-include-cb">文件包含</span
                      ><span class="file-include-count-cc">9489</span
                      ><span class="file-include-data-cd">条数据</span>
                    </div>
                  </div>
                </div>
                <div class="frame-ce">
                  <button class="frame-cf">
                    <span class="import-client-file">导入客群文件</span></button
                  ><button class="download-import-template">
                    <span class="frame-d0">下载导入模板</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="frame-d1">
              <div class="frame-d2">
                <div class="image-d3">
                  <div class="add-include-condition-group"></div>
                  <span class="frame-d4">新增包含条件组</span>
                </div>
                <div class="image-d5">
                  <div class="add-client-file"></div>
                  <span class="add-client-file-d6">添加客群文件</span>
                </div>
                <div class="frame-d7">
                  <div class="image-d8"></div>
                  <span class="add-include-event-sequence"
                    >新增包含事件序列</span
                  >
                </div>
              </div>
            </div>
            <div class="vector-d9"></div>
            <div class="frame-da">
              <div class="frame-db">
                <div class="frame-dc">
                  <div class="image-dd"></div>
                  <span class="exclude-client-conditions"
                    >排除以下条件的客群:</span
                  >
                </div>
                <div class="image-de"></div>
              </div>
              <div class="frame-df">
                <div class="frame-e0">
                  <div class="frame-e1">
                    <div class="frame-e2">
                      <div class="frame-e3">
                        <span class="client-account-type">客户开户类型</span>
                        <div class="image-e4"></div>
                      </div>
                      <div class="frame-e5">
                        <button class="include-e6">
                          <span class="image-e7">包含</span>
                          <div class="frame-e8"></div>
                        </button>
                      </div>
                      <div class="frame-e9">
                        <div class="include-ea">
                          <button class="mcv-eb">
                            <span class="image-ec">MCV</span>
                            <div class="include-ed"></div></button
                          ><button class="hk-ee">
                            <span class="image-ef">HK</span>
                            <div class="frame-f0"></div>
                          </button>
                        </div>
                        <div class="frame-f1">
                          <div class="or-f2">
                            <span class="image-f3">或</span>
                          </div>
                          <div class="group-f4"></div>
                        </div>
                      </div>
                    </div>
                    <div class="condition-and-or-not-f5">
                      <button class="and-f6">
                        <span class="vector-f7">且</span>
                      </button>
                      <div class="frame-f8"></div>
                    </div>
                    <div class="frame-f9">
                      <div class="client-account-status">
                        <span class="image-fa">账户状态</span>
                        <div class="frame-fb"></div>
                      </div>
                      <div class="include-fc">
                        <button class="image-fd">
                          <span class="frame-fe">包含</span>
                          <div class="frame-ff"></div>
                        </button>
                      </div>
                      <div class="include-100">
                        <div class="a-normal-101">
                          <button class="image-102">
                            <span class="text-53">A00正常</span>
                            <div class="pic-22"></div></button
                          ><button class="button-frame">
                            <span class="span-inactive-user"
                              >A20不活跃用户</span
                            >
                            <div class="image-frame"></div>
                          </button>
                        </div>
                        <div class="div-frame">
                          <div class="div-frame-103">
                            <span class="span-or">或</span>
                          </div>
                          <div class="image-frame-104"></div>
                        </div>
                      </div>
                    </div>
                    <div class="group-div">
                      <button class="button-condition">
                        <span class="span-and">且</span>
                      </button>
                      <div class="vector-div"></div>
                    </div>
                    <div class="div-frame-105">
                      <div class="div-frame-106">
                        <span class="span-account-status">账户状态</span>
                        <div class="image-frame-107"></div>
                      </div>
                      <div class="div-frame-108">
                        <button class="button-frame-109">
                          <span class="span-contains">包含</span>
                          <div class="image-frame-10a"></div>
                        </button>
                      </div>
                      <div class="div-frame-10b">
                        <div class="div-frame-10c">
                          <button class="button-frame-10d">
                            <span class="span-normal">A00正常</span>
                            <div class="image-frame-10e"></div></button
                          ><button class="button-frame-10f">
                            <span class="span-inactive-user-110"
                              >A20不活跃用户</span
                            >
                            <div class="image-frame-111"></div>
                          </button>
                        </div>
                        <div class="div-frame-112">
                          <div class="div-frame-113">
                            <span class="span-or-114">或</span>
                          </div>
                          <div class="image-frame-115"></div>
                        </div>
                      </div>
                    </div>
                    <div class="group-div-116">
                      <button class="button-condition-117">
                        <span class="span-and-118">且</span>
                      </button>
                      <div class="vector-div-119"></div>
                    </div>
                    <div class="div-frame-11a">
                      <div class="div-frame-11b">
                        <div class="span-user-id">
                          <span class="span-user-id-11c">用户ID</span
                          ><span class="span-space"> </span>
                        </div>
                        <div class="image-frame-11d"></div>
                      </div>
                      <div class="div-frame-11e">
                        <button class="button-frame-11f">
                          <span class="span-contains-120">包含</span>
                          <div class="image-frame-121"></div>
                        </button>
                      </div>
                      <div class="div-frame-122">
                        <div class="div-frame-123">
                          <button class="button-frame-124">
                            <span class="span-id-number">21083921048910</span>
                            <div class="image-frame-125"></div></button
                          ><button class="button-frame-126">
                            <span class="span-id-number-127"
                              >21083921048910</span
                            >
                            <div class="image-frame-128"></div>
                          </button>
                        </div>
                        <div class="div-frame-129">
                          <button class="button-frame-12a">
                            <div class="image-frame-12b"></div>
                          </button>
                          <div class="image-frame-12c"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="div-frame-12d">
                  <button class="button-frame-12e">
                    <div class="image-frame-12f"></div>
                  </button>
                </div>
              </div>
            </div>
            <div class="div-frame-130">
              <div class="div-frame-131">
                <div class="div-frame-132">
                  <div class="image-div"></div>
                  <span class="span-exclude-group">新增排除条件组</span>
                </div>
                <div class="div-frame-133">
                  <div class="image-div-134"></div>
                  <span class="span-exclude-file">排除客群文件</span>
                </div>
                <div class="div-frame-135">
                  <div class="image-div-136"></div>
                  <span class="span-exclude-sequence">新增排除事件序列</span>
                </div>
                <div class="div-frame-137">
                  <div class="image-div-138"></div>
                  <span class="span-exclude-opt-out">排除opt-out客户</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="div-frame-139">
          <div class="initial-div">
            <div class="div-frame-13a">
              <div class="div-frame-13b">
                <div class="group-management-title">
                  <div class="rectangle-div"></div>
                  <span class="customer-snapshot">客群快照</span>
                </div>
              </div>
              <div class="frame-13c">
                <span class="customer-snapshot-description"
                  >客群快照是一个什么什么什么什么什么什么什么什么什</span
                >
              </div>
            </div>
            <div class="frame-13d">
              <div class="frame-13e">
                <div class="frame-13f">
                  <div class="frame-140">
                    <span class="update-time">更新时间</span>
                  </div>
                  <div class="frame-141">
                    <div class="frame-142">
                      <div class="frame-143">
                        <div class="frame-144">
                          <div class="ellipse-145"></div>
                        </div>
                        <div class="frame-146">
                          <span class="one-time">一次性</span>
                        </div>
                      </div>
                    </div>
                    <div class="frame-147">
                      <div class="frame-148">
                        <div class="frame-149"></div>
                        <div class="frame-14a">
                          <span class="periodicity">周期性</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame-14b">
                <div class="frame-14c">
                  <span class="additional-snapshot-data">附加快照数据</span>
                </div>
                <div class="frame-14d">
                  <div class="frame-14e">
                    <span class="is-zabank-employee">是否zabank員工</span>
                    <div class="image-14f"></div>
                  </div>
                  <div class="vector-150"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="frame-151">
            <div class="frame-152">
              <div class="frame-153">
                <div class="customer-management-title">
                  <div class="rectangle-154"></div>
                  <span class="customer-portrait">客户画像</span>
                </div>
                <div class="frame-155">
                  <div class="image-156"></div>
                  <span class="refresh">刷新</span>
                </div>
              </div>
            </div>
            <div class="frame-157">
              <div class="frame-158">
                <span class="selected-customer-total">选中客户总数</span
                ><span class="comma">1510,219</span>
              </div>
              <div class="frame-159">
                <span class="selected-customer-ratio"
                  >选中客户占所有客户之比</span
                >
                <div class="frame-15a">
                  <div class="frame-15b"><div class="rectangle-15c"></div></div>
                  <span class="percentage">45%</span>
                </div>
              </div>
            </div>
            <div class="frame-15d">
              <div class="frame-15e">
                <div class="frame-15f">
                  <span class="user-id-160">userId</span
                  ><span class="comma-161">1510,012</span>
                </div>
                <div class="frame-162">
                  <span class="push-opt-out">Push opt-out</span
                  ><span class="comma-163">1510,012</span>
                </div>
                <div class="frame-164">
                  <span class="email">email</span
                  ><span class="comma-165">1510,012</span>
                </div>
                <div class="frame-166">
                  <span class="edm-opt-out">EDM opt-out</span
                  ><span class="comma-167">1510,012</span>
                </div>
                <div class="frame-168">
                  <span class="phone-number">手机号</span
                  ><span class="comma-169">1510,012</span>
                </div>
                <div class="frame-16a">
                  <span class="sms-opt-out">SMS opt-out</span
                  ><span class="comma-16b">1510,012</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="frame-16c">
      <div class="frame-16d">
        <button class="button-16e"><span class="cancel">取消</span></button
        ><button class="confirm"><span class="text-80">确定</span></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Page from './page/index.vue'
</script>

<style src="./index.css"></style>
