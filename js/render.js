// --- render.js (最终整合版) ---

document.addEventListener('DOMContentLoaded', function() {

    // --- 主执行函数 ---
    // 只有一个入口点，保证执行顺序
    fetch('js/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 错误！状态: ${response.status}. 无法加载 'js/data.json'`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.searchConfig || !data.categories) {
                throw new Error("JSON 数据格式不正确或缺少必要的配置部分。");
            }
            
            // 步骤 1: 渲染所有静态HTML部分
            renderSearchSection(data.searchConfig);
            renderBookmarkCategories(data.categories);

            // 步骤 2: 绑定所有交互事件
            attachSearchEventListeners(data.searchConfig);
            
            // 步骤 3: 初始化第三方插件
            initializePlugins();
        })
        .catch(error => {
            console.error('严重错误:', error);
            const contentContainer = document.getElementById('dynamic-content-container');
            if (contentContainer) {
                contentContainer.innerHTML = '<p style="text-align: center; color: red;">加载内容失败！请按F12查看控制台中的详细错误信息。</p>';
            }
        });

    // --- 渲染函数 ---

    function renderSearchSection(searchConfig) {
        const searchContainer = document.getElementById('search-container');
        if (!searchConfig || !searchContainer) return;

        const categoriesHTML = searchConfig.groups.map((group, index) => 
            `<div class="category-tab ${index === 0 ? 'active' : ''}" data-category="${group.name}">${group.name}</div>`
        ).join('');

        const providersHTML = searchConfig.providers.map((providerGroup, index) => {
            const itemsHTML = providerGroup.items.map(item => 
                `<div class="provider-item" data-id="${item.id}">${item.name}</div>`
            ).join('');
            return `<div class="provider-list ${index === 0 ? 'active' : ''}" data-category-content="${providerGroup.groupName}">${itemsHTML}</div>`;
        }).join('');

        const fullSearchHTML = `
            <div class="search-bar" id="search-bar">
                <div class="selected-engine" id="selected-engine"></div>
                <input type="text" id="search-text" autocomplete="off">
                <button type="submit"><i class="ti ti-search"></i></button>
            </div>
            <div class="search-options-panel" id="search-options-panel">
                <div class="search-categories">${categoriesHTML}</div>
                <div class="search-providers">${providersHTML}</div>
            </div>
        `;
        searchContainer.innerHTML = fullSearchHTML;
    }

    function renderBookmarkCategories(categories) {
        const contentContainer = document.getElementById('dynamic-content-container');
        if (!categories || !contentContainer) return;

        const allContentHTML = categories.map(category => {
            const itemsHTML = category.items.map(item => {
                let faviconUrl = 'images/browser.svg'; // 默认图标
                try {
                    const hostname = new URL(item.url).hostname;
                    faviconUrl = `https://api.xinac.net/icon/?url=${hostname}`;
                } catch (e) {
                    console.warn(`无效的URL，无法生成图标: ${item.url}`);
                }
                
                return `
                    <div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2w col-xxl-2">
                        <div class="w-widget box2" onclick="window.open('${item.url}', '_blank')" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${item.url}">
                            <div class="w-comment-entry">
                                <a><img data-src="${faviconUrl}" class="lozad img-circle" onerror="this.onerror=null;this.src='images/browser.svg';"></a>
                                <div class="w-comment">
                                    <a class="overflowClip_1"><strong>${item.title}</strong></a>
                                    <p class="overflowClip_2">${item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            return `<h6 class="tag"><i class="ti ti-tag" id="${category.categoryName}"></i>${category.categoryName}</h6><div class="row">${itemsHTML}</div><br />`;
        }).join('');
        contentContainer.innerHTML = allContentHTML;
    }

    // --- 事件绑定和插件初始化 ---

    function attachSearchEventListeners(searchConfig) {
        const elements = {
            form: document.getElementById('super-search-fm'),
            container: document.getElementById('search-container'),
            bar: document.getElementById('search-bar'),
            input: document.getElementById('search-text'),
            engineDisplay: document.getElementById('selected-engine'),
            panel: document.getElementById('search-options-panel'),
            categoryTabsContainer: document.querySelector('.search-categories'),
            providerListsContainer: document.querySelector('.search-providers')
        };

        if (Object.values(elements).some(el => !el)) {
            console.error("关键搜索元素未在DOM中找到，无法绑定事件。");
            return;
        }

        const providerMap = new Map();
        searchConfig.providers.forEach(group => {
            group.items.forEach(item => providerMap.set(item.id, item));
        });

        const updateSearchUI = (engineId) => {
            const engine = providerMap.get(engineId);
            if (!engine) {
                const firstEngine = providerMap.values().next().value;
                if (firstEngine) updateSearchUI(firstEngine.id);
                return;
            }
            elements.input.placeholder = engine.placeholder;
            elements.form.action = engine.url;
            elements.engineDisplay.innerHTML = `<div class="icon-wrapper">${engine.name}</div>`;
            elements.panel.querySelectorAll('.provider-item').forEach(item => {
                item.classList.toggle('selected', item.dataset.id === engineId);
            });
            localStorage.setItem('searchEngineId', engineId);
        };

        elements.engineDisplay.addEventListener('click', (e) => {
            elements.panel.classList.toggle('active');
            elements.bar.classList.toggle('focused');
            e.stopPropagation();
        });

        document.addEventListener('click', (e) => {
            if (!elements.container.contains(e.target)) {
                elements.panel.classList.remove('active');
                elements.bar.classList.remove('focused');
            }
        });

        elements.panel.addEventListener('click', (e) => {
            const categoryTab = e.target.closest('.category-tab');
            if (categoryTab) {
                const categoryName = categoryTab.dataset.category;
                elements.categoryTabsContainer.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
                categoryTab.classList.add('active');
                elements.providerListsContainer.querySelectorAll('.provider-list').forEach(list => {
                    list.classList.toggle('active', list.dataset.categoryContent === categoryName);
                });
            }
            const providerItem = e.target.closest('.provider-item');
            if (providerItem) {
                updateSearchUI(providerItem.dataset.id);
                elements.input.focus();
                elements.panel.classList.remove('active');
                elements.bar.classList.remove('focused');
            }
        });
        
        elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = elements.input.value.trim();
            if (query) {
                const url = `${elements.form.action}${encodeURIComponent(query)}`;
                window.open(url, '_blank');
            }
        });
        
        const initialEngineId = localStorage.getItem('searchEngineId');
        if (initialEngineId && providerMap.has(initialEngineId)) {
            updateSearchUI(initialEngineId);
            const initialEngine = providerMap.get(initialEngineId);
            const initialGroup = searchConfig.providers.find(p => p.items.some(i => i.id === initialEngineId));
            if (initialGroup) {
                 const initialTab = document.querySelector(`.category-tab[data-category="${initialGroup.groupName}"]`);
                 if (initialTab) initialTab.click();
            }
        } else {
            const firstEngine = providerMap.values().next().value;
            if (firstEngine) {
                updateSearchUI(firstEngine.id);
                const firstTab = document.querySelector('.category-tab');
                if (firstTab) firstTab.click();
            }
        }
    }

    function initializePlugins() {
        if (typeof lozad === 'function') {
            const observer = lozad();
            observer.observe();
        }
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.forEach(tooltipTriggerEl => {
                new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    }
});