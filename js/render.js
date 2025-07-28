document.addEventListener('DOMContentLoaded', function() {
    const contentContainer = document.getElementById('dynamic-content-container');
    if (!contentContainer) {
        console.error('未找到动态内容容器！');
        return;
    }

    // 创建单个项目卡片
    function createItemCard(item) {
        return `
            <div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2w col-xxl-2">
                <div class="w-widget box2"
                    onclick="window.open('${item.url}', '_blank')" 
                    data-bs-toggle="tooltip" data-bs-placement="bottom" 
                    title="${item.url}">
                    <div class="w-comment-entry">
                        <a>
                            <img data-src="https://api.xinac.net/icon/?url=${new URL(item.url).hostname}" 
                            class="lozad img-circle" 
                            onerror="this.onerror=null;this.src='images/browser.svg';">
                        </a>
                        <div class="w-comment">
                            <a class="overflowClip_1">
                                <strong>${item.title}</strong>
                            </a>
                            <p class="overflowClip_2">
                                ${item.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 创建分类区块
    function createCategorySection(category) {
        // 生成该分类下所有项目的HTML
        const itemsHTML = category.items.map(createItemCard).join('');

        // 将标题和项目组合成完整区块
        return `
            <h6 class="tag">
                <i class="ti ti-tag" id="${category.categoryName}"></i>${category.categoryName}
            </h6>
            <div class="row">
                ${itemsHTML}
            </div>
            <br />
        `;
    }

    // 获取JSON数据并渲染内容
    fetch('js/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP错误！状态码: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 生成所有分类的完整HTML
            const allContentHTML = data.categories.map(createCategorySection).join('');
            
            // 将生成的HTML插入容器
            contentContainer.innerHTML = allContentHTML;

            // 在DOM中添加内容后，重新初始化lozad和工具提示
            const observer = lozad();
            observer.observe();
            
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        })
        .catch(error => {
            console.error('获取或解析数据时出错:', error);
            contentContainer.innerHTML = '<p style="text-align: center; color: red;">错误：无法加载内容。请检查控制台。</p>';
        });
});