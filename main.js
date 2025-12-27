// HTOS 系统开机动画脚本

// DOM元素获取
let progressText, statusText, logo;

// 启动状态数组
const bootStatuses = [
    '正在启动系统...',
    '加载系统内核...',
    '初始化硬件设备...',
    '加载驱动程序...',
    '配置系统服务...',
    '准备用户环境...',
    '启动完成，正在进入系统...'
];

// 进度增长函数
function updateProgress(currentProgress, targetProgress, duration) {
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(currentProgress + (targetProgress - currentProgress) * (elapsed / duration), targetProgress);
        
        progressText.textContent = Math.round(progress) + '%';
        
        if (elapsed < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// 状态更新函数
function updateStatus(index) {
    if (index < bootStatuses.length) {
        statusText.textContent = bootStatuses[index];
        
        // 添加状态变化动画
        statusText.style.opacity = '0.5';
        setTimeout(() => {
            statusText.style.opacity = '0.9';
        }, 300);
    }
}

// 系统启动主函数
function startBootProcess() {
    let currentProgress = 0;
    let statusIndex = 0;
    
    // 检查是否触发蓝屏（20%概率）
    const blueScreenChance = Math.random();
    if (blueScreenChance < 0.2) {
        // 触发蓝屏
        showBlueScreen();
        return;
    }
    
    // 第一阶段：0-20%
    setTimeout(() => {
        updateProgress(currentProgress, 20, 2000);
        currentProgress = 20;
        updateStatus(++statusIndex);
    }, 1000);
    
    // 第二阶段：20-45%
    setTimeout(() => {
        updateProgress(currentProgress, 45, 2500);
        currentProgress = 45;
        updateStatus(++statusIndex);
    }, 4000);
    
    // 第三阶段：45-70%
    setTimeout(() => {
        updateProgress(currentProgress, 70, 3000);
        currentProgress = 70;
        updateStatus(++statusIndex);
    }, 7500);
    
    // 第四阶段：70-85%
    setTimeout(() => {
        updateProgress(currentProgress, 85, 2000);
        currentProgress = 85;
        updateStatus(++statusIndex);
    }, 11500);
    
    // 第五阶段：85-95%
    setTimeout(() => {
        updateProgress(currentProgress, 95, 2000);
        currentProgress = 95;
        updateStatus(++statusIndex);
    }, 14500);
    
    // 第六阶段：95-100%
    setTimeout(() => {
        updateProgress(currentProgress, 100, 1500);
        currentProgress = 100;
        updateStatus(++statusIndex);
        
        // 启动完成后添加闪烁效果
        setTimeout(() => {
            logo.style.animation = 'pulse 1s ease-in-out 3';
        }, 2000);
        
        // 启动完成后显示第一次开机选择界面
            setTimeout(() => {
                document.querySelector('.boot-screen').style.animation = 'fadeOut 1s ease-out forwards';
                setTimeout(() => {
                    // 显示第一次开机选择界面
                    const firstBootScreen = document.getElementById('firstBootScreen');
                    firstBootScreen.classList.add('active');
                    console.log('HTOS 系统启动完成，进入首次使用选择界面！');
                }, 1000);
            }, 4000);
    }, 17500);
}

// 页面加载完成后开始启动过程
window.addEventListener('load', () => {
    // 获取DOM元素
    progressText = document.querySelector('.progress-text');
    statusText = document.querySelector('.status-text');
    logo = document.querySelector('.logo');
    
    // 添加初始logo闪烁效果
    logo.style.animation = 'pulse 1s ease-in-out 2';
    
    // 延迟开始启动过程，营造更好的视觉效果
    setTimeout(() => {
        startBootProcess();
    }, 2000);
});

// 添加键盘事件监听（可选功能）

// 蓝屏功能
function showBlueScreen() {
    const blueScreen = document.getElementById('blueScreen');
    const bsodProgressBar = document.getElementById('bsodProgressBar');
    const progressText = blueScreen.querySelector('.progress-text');
    
    // 显示蓝屏
    blueScreen.style.display = 'flex';
    
    // 隐藏启动界面
    const startupScreen = document.getElementById('startupScreen');
    if (startupScreen) {
        startupScreen.style.display = 'none';
    }
    
    const bootScreen = document.querySelector('.boot-screen');
    if (bootScreen) {
        bootScreen.style.display = 'none';
    }
    
    // 模拟修复进度
    let repairProgress = 0;
    const repairInterval = setInterval(() => {
        repairProgress += Math.random() * 10;
        if (repairProgress > 100) {
            repairProgress = 100;
            clearInterval(repairInterval);
            
            // 修复完成后重启
            setTimeout(() => {
                progressText.textContent = '修复完成，正在重启...';
                
                // 3秒后隐藏蓝屏并继续启动
                setTimeout(() => {
                    blueScreen.style.display = 'none';
                    
                    // 重新显示启动界面并继续启动
                    if (startupScreen) {
                        startupScreen.style.display = 'flex';
                    }
                    if (bootScreen) {
                        bootScreen.style.display = 'flex';
                    }
                    
                    // 继续正常启动流程
                    continueBootAfterBlueScreen();
                }, 3000);
            }, 1000);
        }
        
        // 更新进度条和文本
        bsodProgressBar.style.width = repairProgress + '%';
        progressText.textContent = `正在修复... ${Math.round(repairProgress)}%`;
    }, 500);
}

// 蓝屏后继续启动流程
function continueBootAfterBlueScreen() {
    let currentProgress = 0;
    let statusIndex = 0;
    
    // 第一阶段：0-20%
    setTimeout(() => {
        updateProgress(currentProgress, 20, 2000);
        currentProgress = 20;
        updateStatus(++statusIndex);
    }, 1000);
    
    // 第二阶段：20-45%
    setTimeout(() => {
        updateProgress(currentProgress, 45, 2500);
        currentProgress = 45;
        updateStatus(++statusIndex);
    }, 4000);
    
    // 第三阶段：45-70%
    setTimeout(() => {
        updateProgress(currentProgress, 70, 3000);
        currentProgress = 70;
        updateStatus(++statusIndex);
    }, 7500);
    
    // 第四阶段：70-85%
    setTimeout(() => {
        updateProgress(currentProgress, 85, 2000);
        currentProgress = 85;
        updateStatus(++statusIndex);
    }, 11500);
    
    // 第五阶段：85-95%
    setTimeout(() => {
        updateProgress(currentProgress, 95, 2000);
        currentProgress = 95;
        updateStatus(++statusIndex);
    }, 14500);
    
    // 第六阶段：95-100%
    setTimeout(() => {
        updateProgress(currentProgress, 100, 1500);
        currentProgress = 100;
        updateStatus(++statusIndex);
        
        // 启动完成后添加闪烁效果
        setTimeout(() => {
            logo.style.animation = 'pulse 1s ease-in-out 3';
        }, 2000);
        
        // 启动完成后显示第一次开机选择界面
            setTimeout(() => {
                document.querySelector('.boot-screen').style.animation = 'fadeOut 1s ease-out forwards';
                setTimeout(() => {
                    // 显示第一次开机选择界面
                    const firstBootScreen = document.getElementById('firstBootScreen');
                    firstBootScreen.classList.add('active');
                    console.log('HTOS 系统启动完成，进入首次使用选择界面！');
                }, 1000);
            }, 4000);
    }, 17500);
}
document.addEventListener('keydown', (e) => {
    // 按Enter键可以加快启动进度
    if (e.key === 'Enter') {
        console.log('快速启动模式已激活');
        updateProgress(0, 100, 2000);
        updateStatus(bootStatuses.length - 1);
        
        // 快速启动后直接显示注册界面
        setTimeout(() => {
            document.querySelector('.boot-screen').style.animation = 'fadeOut 1s ease-out forwards';
            setTimeout(() => {
                const setupScreen = document.getElementById('setupScreen');
                setupScreen.classList.add('active');
            }, 1000);
        }, 2500);
    }
});

// 系统设置界面功能
window.addEventListener('DOMContentLoaded', () => {
    // 获取所有界面元素
    const firstBootScreen = document.getElementById('firstBootScreen');
    const keyScreen = document.getElementById('keyScreen');
    const setupScreen = document.getElementById('setupScreen');
    
    // 第一次开机选择按钮
    const notFirstBootBtn = document.getElementById('notFirstBootBtn');
    const firstBootBtn = document.getElementById('firstBootBtn');
    
    // 产品密钥界面元素
    const keyForm = document.getElementById('keyForm');
    const productKey = document.getElementById('productKey');
    const skipKeyBtn = document.getElementById('skipKeyBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // 注册界面元素
    const setupForm = document.getElementById('setupForm');
    const skipBtn = document.getElementById('skipBtn');
    const createBtn = document.getElementById('createBtn');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    // 密码匹配验证
    function validatePassword() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('密码不匹配');
            return false;
        } else {
            confirmPassword.setCustomValidity('');
            return true;
        }
    }
    
    // 实时验证密码
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validatePassword);
    
    // 更新桌面时钟
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }
    
    // 显示桌面
    function showDesktop() {
        // 隐藏所有设置界面
        firstBootScreen.classList.remove('active');
        keyScreen.classList.remove('active');
        setupScreen.classList.remove('active');
        
        // 显示桌面
        const desktop = document.getElementById('desktop');
        desktop.classList.add('active');
        
        // 启动时钟
        updateClock();
        setInterval(updateClock, 1000);
        
        console.log('已进入 HTOS 桌面！');
    }
    
    // 不是第一次开机 - 直接进入系统
    notFirstBootBtn.addEventListener('click', () => {
        showDesktop();
    });
    
    // 是第一次开机 - 显示产品密钥界面
    firstBootBtn.addEventListener('click', () => {
        firstBootScreen.classList.remove('active');
        keyScreen.classList.add('active');
        
        // 使用固定产品密钥
        const fixedKey = 'JAWBD-AWHIS-HTOSM-HOMES';
        productKey.value = fixedKey;
        
        // 复制密钥到剪贴板
        navigator.clipboard.writeText(fixedKey).then(() => {
            console.log('产品密钥已自动复制到剪贴板！');
            alert('产品密钥已自动填入并复制到剪贴板！\n密钥：' + fixedKey);
        }).catch(err => {
            console.error('复制到剪贴板失败:', err);
            alert('产品密钥已自动填入！\n密钥：' + fixedKey);
        });
        
        console.log('用户选择第一次开机，进入产品密钥界面！');
    });
    
    // 跳过产品密钥
    skipKeyBtn.addEventListener('click', () => {
        keyScreen.classList.remove('active');
        setupScreen.classList.add('active');
        console.log('用户选择跳过产品密钥，进入注册界面！');
    });
    
    // 产品密钥表单提交
    keyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 模拟密钥验证
        const key = productKey.value.trim();
        console.log('用户输入产品密钥:', key);
        
        // 简单验证密钥格式
        const keyPattern = /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/;
        if (!keyPattern.test(key)) {
            alert('产品密钥格式不正确，请检查输入！');
            return;
        }
        
        nextBtn.disabled = true;
        nextBtn.textContent = '验证中...';
        
        // 模拟密钥验证过程
        setTimeout(() => {
            console.log('产品密钥验证成功！');
            alert('产品密钥验证成功！');
            
            keyScreen.classList.remove('active');
            setupScreen.classList.add('active');
            
            nextBtn.disabled = false;
            nextBtn.textContent = '下一步';
        }, 1500);
    });
    
    // 注册表单提交事件
    setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validatePassword()) {
            alert('密码不匹配，请重新输入');
            return;
        }
        
        // 获取表单数据
        const formData = new FormData(setupForm);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        // 模拟账户创建过程
        createBtn.disabled = true;
        createBtn.textContent = '创建中...';
        
        setTimeout(() => {
            console.log('账户创建成功！', userData);
            alert('账户创建成功！欢迎使用 HTOS 系统！');
            
            // 进入桌面
            showDesktop();
            
            // 重置按钮状态
            createBtn.disabled = false;
            createBtn.textContent = '创建账户';
        }, 1500);
    });
    
    // 跳过注册设置
    skipBtn.addEventListener('click', () => {
        if (confirm('确定要跳过账户设置吗？您可以稍后在系统设置中完成。')) {
            console.log('用户选择跳过账户设置');
            
            // 进入桌面
            showDesktop();
        }
    });
    
    // 桌面图标点击事件
    document.addEventListener('click', (e) => {
        const desktopIcon = e.target.closest('.desktop-icon');
        if (desktopIcon) {
            const iconLabel = desktopIcon.querySelector('.icon-label').textContent;
            if (iconLabel === '文件资源管理器') {
                showExplorer();
            } else if (iconLabel === '浏览器') {
                openBrowser();
            } else if (iconLabel === '设置') {
                openSettings();
            } else if (iconLabel === '此电脑') {
                showExplorer();
            } else if (iconLabel === '回收站') {
                showRecycleBin();
            } else {
                alert(`您点击了：${iconLabel}`);
            }
        }
    });
    
    // 开始菜单功能
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');

    // 切换开始菜单显示/隐藏
    if (startButton) {
        startButton.addEventListener('click', () => {
            startMenu.classList.toggle('active');
        });
    }

    // 点击桌面其他区域关闭开始菜单
    document.addEventListener('click', function(event) {
        if (startMenu && !startMenu.contains(event.target) && startButton && !startButton.contains(event.target)) {
            startMenu.classList.remove('active');
        }
    });

    // 浏览器功能
    const browserWindow = document.getElementById('browserWindow');
    const browserContent = document.getElementById('browserContent');
    const browserAddress = document.getElementById('browserAddress');
    const browserBack = document.getElementById('browserBack');
    const browserForward = document.getElementById('browserForward');
    const browserRefresh = document.getElementById('browserRefresh');
    const browserHome = document.getElementById('browserHome');
    const browserGo = document.getElementById('browserGo');
    
    // 浏览器历史记录
    let browserHistory = ['https://www.example.com'];
    let browserHistoryIndex = 0;
    
    // 显示浏览器
    function showBrowser() {
        if (browserWindow) {
            browserWindow.classList.add('active');
            browserWindow.style.zIndex = '1001';
            loadPage(browserHistory[browserHistoryIndex]);
        }
    }
    
    // 加载页面
    function loadPage(url) {
        // 显示加载动画
        browserContent.innerHTML = `
            <div class="browser-loading">
                <div class="loading-spinner"></div>
                <div class="loading-text">正在加载...</div>
            </div>
        `;
        
        // 模拟页面加载
        setTimeout(() => {
            // 生成模拟页面内容
            const pageContent = `
                <div class="browser-page">
                    <h1>欢迎访问 ${url}</h1>
                    <p>这是一个模拟的网页内容。</p>
                    <p>当前URL: ${url}</p>
                    <p>浏览器功能已实现基本导航和页面加载。</p>
                    <p>支持的功能：</p>
                    <ul>
                        <li>地址栏输入和访问</li>
                        <li>前进/后退导航</li>
                        <li>刷新页面</li>
                        <li>返回主页</li>
                    </ul>
                </div>
            `;
            
            browserContent.innerHTML = pageContent;
            // 更新地址栏
            browserAddress.value = url;
            // 更新历史记录
            if (browserHistoryIndex < browserHistory.length - 1) {
                browserHistory = browserHistory.slice(0, browserHistoryIndex + 1);
            }
            if (browserHistory[browserHistoryIndex] !== url) {
                browserHistory.push(url);
                browserHistoryIndex++;
            }
            updateBrowserButtons();
        }, 1000);
    }
    
    // 更新浏览器按钮状态
    function updateBrowserButtons() {
        browserBack.disabled = browserHistoryIndex === 0;
        browserBack.style.opacity = browserHistoryIndex === 0 ? '0.5' : '1';
        
        browserForward.disabled = browserHistoryIndex === browserHistory.length - 1;
        browserForward.style.opacity = browserHistoryIndex === browserHistory.length - 1 ? '0.5' : '1';
    }
    
    // 浏览器后退
    browserBack.addEventListener('click', function() {
        if (browserHistoryIndex > 0) {
            browserHistoryIndex--;
            loadPage(browserHistory[browserHistoryIndex]);
        }
    });
    
    // 浏览器前进
    browserForward.addEventListener('click', function() {
        if (browserHistoryIndex < browserHistory.length - 1) {
            browserHistoryIndex++;
            loadPage(browserHistory[browserHistoryIndex]);
        }
    });
    
    // 浏览器刷新
    browserRefresh.addEventListener('click', function() {
        loadPage(browserHistory[browserHistoryIndex]);
    });
    
    // 浏览器主页
    browserHome.addEventListener('click', function() {
        const homeUrl = 'https://www.example.com';
        loadPage(homeUrl);
    });
    
    // 浏览器访问
    browserGo.addEventListener('click', function() {
        let url = browserAddress.value.trim();
        if (!url) return;
        
        // 简单的URL验证和补全
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        loadPage(url);
    });
    
    // 地址栏回车访问
    browserAddress.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            browserGo.click();
        }
    });

// 设置功能
const settingsWindow = document.getElementById('settingsWindow');
const settingsItems = document.querySelectorAll('.settings-item');
const settingsContents = document.querySelectorAll('.settings-content');
const themeOptions = document.querySelectorAll('.theme-option');

function showSettings() {
    settingsWindow.style.display = 'block';
    settingsWindow.style.zIndex = getNextZIndex();
}

// 设置项切换功能
settingsItems.forEach(item => {
    item.addEventListener('click', function() {
        // 移除所有活动状态
        settingsItems.forEach(i => i.classList.remove('active'));
        settingsContents.forEach(content => content.style.display = 'none');
        
        // 添加当前活动状态
        this.classList.add('active');
        const section = this.getAttribute('data-section');
        document.getElementById(`settings${capitalizeFirstLetter(section)}`).style.display = 'block';
    });
});

// 主题切换功能
themeOptions.forEach(option => {
    option.addEventListener('click', function() {
        // 移除所有活动状态
        themeOptions.forEach(opt => opt.classList.remove('active'));
        
        // 添加当前活动状态
        this.classList.add('active');
        const theme = this.getAttribute('data-theme');
        
        // 这里可以添加实际的主题切换逻辑
        console.log(`切换到${theme}主题`);
        
        // 显示切换提示
        alert(`已切换到${theme === 'dark' ? '深色' : '浅色'}主题`);
    });
});

// 记事本功能
const notepadWindow = document.getElementById('notepadWindow');
const notepadText = document.getElementById('notepadText');
const notepadNew = document.getElementById('notepadNew');
const notepadOpen = document.getElementById('notepadOpen');
const notepadSave = document.getElementById('notepadSave');

function showNotepad() {
    notepadWindow.style.display = 'block';
    notepadWindow.style.zIndex = getNextZIndex();
    notepadText.focus();
}

// 新建功能
notepadNew.addEventListener('click', function() {
    if (notepadText.value !== '' && confirm('当前内容尚未保存，确定要新建吗？')) {
        notepadText.value = '';
    }
});

// 打开功能
notepadOpen.addEventListener('click', function() {
    const openFileName = prompt('请输入要打开的文件名:');
    if (openFileName) {
        alert(`已打开文件: ${openFileName}`);
        // 实际应用中可以在此处实现文件读取功能
    }
});

// 保存功能
notepadSave.addEventListener('click', function() {
    const saveFileName = prompt('请输入保存的文件名:', '未命名.txt');
    if (saveFileName) {
        alert(`文件已保存为: ${saveFileName}`);
        // 实际应用中可以在此处实现文件保存功能
    }
});

// 辅助函数：首字母大写
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 照片功能
const photosWindow = document.getElementById('photosWindow');
const photosGallery = document.getElementById('photosGallery');
const photosViewer = document.getElementById('photosViewer');
const viewerContent = document.getElementById('viewerContent');
const photosPrevious = document.getElementById('photosPrevious');
const photosNext = document.getElementById('photosNext');
const photosSlideshow = document.getElementById('photosSlideshow');

// 模拟照片数据
const photos = [
    { src: 'BHGGHJDECGFJF-qXTv1N3NUp.png', alt: '示例图片' }
    // 可以在这里添加更多图片
];

let currentPhotoIndex = -1;
let slideshowInterval = null;

function showPhotos() {
    photosWindow.style.display = 'block';
    photosWindow.style.zIndex = getNextZIndex();
    
    // 初始化图片库
    initPhotosGallery();
}

function initPhotosGallery() {
    // 清空当前图库
    photosGallery.innerHTML = '';
    
    // 添加所有照片到图库
    photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.setAttribute('data-src', photo.src);
        photoItem.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        
        photoItem.appendChild(img);
        photosGallery.appendChild(photoItem);
        
        // 添加点击事件
        photoItem.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            viewPhoto(index);
        });
    });
}

function viewPhoto(index) {
    if (index < 0 || index >= photos.length) return;
    
    currentPhotoIndex = index;
    const photo = photos[index];
    
    // 更新查看器内容
    viewerContent.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}">
        <div class="viewer-caption">${index + 1} / ${photos.length}</div>
    `;
    
    // 更新按钮状态
    updatePhotosButtons();
}

function updatePhotosButtons() {
    photosPrevious.disabled = currentPhotoIndex <= 0;
    photosNext.disabled = currentPhotoIndex >= photos.length - 1;
}

// 照片导航功能
photosPrevious.addEventListener('click', function() {
    if (currentPhotoIndex > 0) {
        viewPhoto(currentPhotoIndex - 1);
    }
});

photosNext.addEventListener('click', function() {
    if (currentPhotoIndex < photos.length - 1) {
        viewPhoto(currentPhotoIndex + 1);
    }
});

// 幻灯片功能
photosSlideshow.addEventListener('click', function() {
    if (slideshowInterval) {
        // 停止幻灯片
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        this.textContent = '幻灯片';
    } else {
        // 开始幻灯片
        if (currentPhotoIndex === -1) {
            viewPhoto(0);
        }
        
        slideshowInterval = setInterval(() => {
            let nextIndex = currentPhotoIndex + 1;
            if (nextIndex >= photos.length) {
                nextIndex = 0;
            }
            viewPhoto(nextIndex);
        }, 2000);
        
        this.textContent = '停止幻灯片';
    }
});

// 辅助函数：获取下一个z-index值
function getNextZIndex() {
    const windows = document.querySelectorAll('.window');
    let maxZIndex = 1000;
    windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex) || 0;
        if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
    });
    return maxZIndex + 1;
}
    
    // 开始菜单应用程序点击事件
    const appItems = document.querySelectorAll('.app-item');
    appItems.forEach(item => {
        item.addEventListener('click', function() {
            const appName = this.querySelector('.app-name').textContent;
            if (appName === '文件资源管理器') {
                showExplorer();
            } else if (appName === '浏览器') {
                showBrowser();
            } else if (appName === '设置') {
            showSettings();
            } else if (appName === '记事本') {
            showNotepad();
        } else if (appName === '照片') {
                showPhotos();
            }
            if (startMenu) {
                startMenu.classList.remove('active');
            }
        });
    });

    // 电源选项点击事件
    const powerOptions = document.querySelectorAll('.power-option');
    powerOptions.forEach(option => {
        option.addEventListener('click', function() {
            const powerLabel = this.querySelector('.power-label').textContent;
            
            // 根据不同的电源选项执行不同的功能
            switch(powerLabel) {
                case '锁定':
                    showLockScreen();
                    break;
                case '切换用户':
                    showUserSwitchScreen();
                    break;
                case '睡眠':
                    showSleepScreen();
                    break;
                case '休眠':
                    showHibernateScreen();
                    break;
                case '重启':
                    if (confirm('确定要重启系统吗？')) {
                        showRestartScreen();
                    }
                    break;
                case '关机':
                    if (confirm('确定要关闭系统吗？')) {
                        showShutdownScreen();
                    }
                    break;
                default:
                    alert(`无法识别的电源操作: ${powerLabel}`);
            }
            
            if (startMenu) {
                startMenu.classList.remove('active');
            }
        });
    });

    // 电源选项功能实现
    function showLockScreen() {
        // 创建锁定屏幕
        const lockScreen = document.createElement('div');
        lockScreen.className = 'lock-screen';
        lockScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
        `;
        
        const lockIcon = document.createElement('div');
        lockIcon.style.cssText = `
            font-size: 80px;
            margin-bottom: 20px;
        `;
        lockIcon.textContent = '🔒';
        
        const lockText = document.createElement('div');
        lockText.textContent = '系统已锁定';
        
        const unlockText = document.createElement('div');
        unlockText.style.cssText = `
            font-size: 16px;
            margin-top: 40px;
            opacity: 0.8;
        `;
        unlockText.textContent = '点击任意位置解锁';
        
        lockScreen.appendChild(lockIcon);
        lockScreen.appendChild(lockText);
        lockScreen.appendChild(unlockText);
        
        document.body.appendChild(lockScreen);
        
        // 添加点击事件解锁
        lockScreen.addEventListener('click', function() {
            document.body.removeChild(lockScreen);
        });
    }
    
    function showUserSwitchScreen() {
        // 创建用户切换屏幕
        const userSwitchScreen = document.createElement('div');
        userSwitchScreen.className = 'user-switch-screen';
        userSwitchScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
        `;
        
        const title = document.createElement('div');
        title.style.cssText = `
            font-size: 36px;
            margin-bottom: 40px;
        `;
        title.textContent = '切换用户';
        
        const user1 = document.createElement('div');
        user1.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            cursor: pointer;
            padding: 20px;
            border-radius: 10px;
            transition: all 0.3s ease;
        `;
        user1.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 10px;">👤</div>
            <div style="font-size: 20px;">当前用户</div>
        `;
        
        const user2 = document.createElement('div');
        user2.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            cursor: pointer;
            padding: 20px;
            border-radius: 10px;
            transition: all 0.3s ease;
        `;
        user2.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 10px;">👤</div>
            <div style="font-size: 20px;">访客用户</div>
        `;
        
        // 添加悬停效果
        [user1, user2].forEach(user => {
            user.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            });
            user.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
            
            // 添加点击事件
            user.addEventListener('click', function() {
                document.body.removeChild(userSwitchScreen);
            });
        });
        
        const usersContainer = document.createElement('div');
        usersContainer.style.display = 'flex';
        usersContainer.appendChild(user1);
        usersContainer.appendChild(user2);
        
        userSwitchScreen.appendChild(title);
        userSwitchScreen.appendChild(usersContainer);
        
        document.body.appendChild(userSwitchScreen);
    }
    
    function showSleepScreen() {
        // 创建睡眠屏幕
        const sleepScreen = document.createElement('div');
        sleepScreen.className = 'sleep-screen';
        sleepScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1a1a1a;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #666;
        `;
        
        const sleepIcon = document.createElement('div');
        sleepIcon.style.cssText = `
            font-size: 80px;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        `;
        sleepIcon.textContent = '💤';
        
        const sleepText = document.createElement('div');
        sleepText.textContent = '系统正在睡眠中...';
        
        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
        
        sleepScreen.appendChild(sleepIcon);
        sleepScreen.appendChild(sleepText);
        
        document.body.appendChild(sleepScreen);
        
        // 模拟睡眠一段时间后唤醒
        setTimeout(() => {
            document.body.removeChild(sleepScreen);
            document.head.removeChild(style);
        }, 3000);
    }
    
    function showHibernateScreen() {
        // 创建休眠屏幕
        const hibernateScreen = document.createElement('div');
        hibernateScreen.className = 'hibernate-screen';
        hibernateScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #333;
        `;
        
        const hibernateIcon = document.createElement('div');
        hibernateIcon.style.cssText = `
            font-size: 80px;
            margin-bottom: 20px;
        `;
        hibernateIcon.textContent = '⏸️';
        
        const hibernateText = document.createElement('div');
        hibernateText.textContent = '系统正在休眠中...';
        
        hibernateScreen.appendChild(hibernateIcon);
        hibernateScreen.appendChild(hibernateText);
        
        document.body.appendChild(hibernateScreen);
        
        // 模拟休眠操作
        setTimeout(() => {
            alert('系统已进入休眠状态。\n\n要唤醒系统，请按电源按钮。');
            document.body.removeChild(hibernateScreen);
        }, 2000);
    }
    
    function showRestartScreen() {
        // 创建重启屏幕
        const restartScreen = document.createElement('div');
        restartScreen.className = 'restart-screen';
        restartScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
        `;
        
        const restartIcon = document.createElement('div');
        restartIcon.style.cssText = `
            font-size: 80px;
            margin-bottom: 20px;
            animation: rotate 2s linear infinite;
        `;
        restartIcon.textContent = '🔄';
        
        const restartText = document.createElement('div');
        restartText.textContent = '系统正在重启...';
        
        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        restartScreen.appendChild(restartIcon);
        restartScreen.appendChild(restartText);
        
        document.body.appendChild(restartScreen);
        
        // 模拟重启操作
        setTimeout(() => {
            alert('系统已重启完成！');
            document.body.removeChild(restartScreen);
            document.head.removeChild(style);
        }, 3000);
    }
    
    function showShutdownScreen() {
        // 创建关机屏幕
        const shutdownScreen = document.createElement('div');
        shutdownScreen.className = 'shutdown-screen';
        shutdownScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #666;
        `;
        
        const shutdownIcon = document.createElement('div');
        shutdownIcon.style.cssText = `
            font-size: 80px;
            margin-bottom: 20px;
            opacity: 0.5;
        `;
        shutdownIcon.textContent = '🚪';
        
        const shutdownText = document.createElement('div');
        shutdownText.textContent = '系统正在关闭...';
        
        shutdownScreen.appendChild(shutdownIcon);
        shutdownScreen.appendChild(shutdownText);
        
        document.body.appendChild(shutdownScreen);
        
        // 模拟关机操作
        setTimeout(() => {
            alert('系统已成功关闭！\n\n要重新启动系统，请按电源按钮。');
            document.body.removeChild(shutdownScreen);
        }, 3000);
    }

    // 浏览器功能
    function openBrowser() {
        const browserWindow = document.createElement('div');
        browserWindow.className = 'window browser-window';
        browserWindow.style.cssText = `
            width: 800px;
            height: 600px;
            top: 100px;
            left: 100px;
            z-index: ${zIndex++};
        `;
        
        browserWindow.innerHTML = `
            <div class="window-header">
                <div class="window-title">浏览器</div>
                <div class="window-controls">
                    <button class="window-minimize">-</button>
                    <button class="window-maximize">□</button>
                    <button class="window-close">×</button>
                </div>
            </div>
            <div class="window-content">
                <div class="browser-toolbar">
                    <button class="browser-btn">←</button>
                    <button class="browser-btn">→</button>
                    <input type="text" class="browser-url" value="https://www.example.com" style="width: 60%; margin: 0 10px;">
                    <button class="browser-btn">刷新</button>
                    <button class="browser-btn">主页</button>
                </div>
                <div class="browser-content" style="padding: 20px;">
                    <h2>示例网页</h2>
                    <p>欢迎使用浏览器！这是一个示例网页内容。</p>
                    <p>在实际应用中，这里可以集成一个Web视图或iframe来显示网页内容。</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(browserWindow);
        
        // 添加窗口控制功能
        addWindowControls(browserWindow);
        makeDraggable(browserWindow);
    }
    
    // 设置功能
    function openSettings() {
        const settingsWindow = document.createElement('div');
        settingsWindow.className = 'window settings-window';
        settingsWindow.style.cssText = `
            width: 700px;
            height: 500px;
            top: 150px;
            left: 200px;
            z-index: ${zIndex++};
        `;
        
        settingsWindow.innerHTML = `
            <div class="window-header">
                <div class="window-title">设置</div>
                <div class="window-controls">
                    <button class="window-minimize">-</button>
                    <button class="window-maximize">□</button>
                    <button class="window-close">×</button>
                </div>
            </div>
            <div class="window-content">
                <div class="settings-content" style="padding: 20px;">
                    <h2>系统设置</h2>
                    <div style="margin-bottom: 20px;">
                        <label><input type="checkbox" checked> 启用自动更新</label>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label><input type="checkbox" checked> 启用声音</label>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label>屏幕分辨率: </label>
                        <select>
                            <option>1920×1080</option>
                            <option>1366×768</option>
                            <option>1280×720</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label>主题: </label>
                        <select>
                            <option>浅色</option>
                            <option>深色</option>
                        </select>
                    </div>
                    <button style="padding: 10px 20px;">保存设置</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(settingsWindow);
        
        // 添加窗口控制功能
        addWindowControls(settingsWindow);
        makeDraggable(settingsWindow);
    }
    
    // 文件资源管理器功能
    const explorerWindow = document.getElementById('explorerWindow');
    
    // 模拟文件系统数据
    const fileSystem = {
        '主页': [
            { name: '文档.txt', type: 'file', size: '2KB', details: '文本文件' },
            { name: '图片.jpg', type: 'file', size: '1.2MB', details: 'JPEG 图像' },
            { name: '下载', type: 'folder', details: '文件夹' },
            { name: '文档', type: 'folder', details: '文件夹' }
        ],
        '收藏夹': [
            { name: '重要文件', type: 'folder', details: '文件夹' },
            { name: '会议记录.txt', type: 'file', size: '5KB', details: '文本文件' }
        ],
        '最近访问': [
            { name: '文档.txt', type: 'file', size: '2KB', details: '文本文件' },
            { name: '图片.jpg', type: 'file', size: '1.2MB', details: 'JPEG 图像' },
            { name: '会议记录.txt', type: 'file', size: '5KB', details: '文本文件' }
        ],
        '本地磁盘 (C:)': [
            { name: 'Windows', type: 'folder', details: '文件夹' },
            { name: 'Program Files', type: 'folder', details: '文件夹' },
            { name: 'Users', type: 'folder', details: '文件夹' }
        ],
        '本地磁盘 (D:)': [
            { name: '电影', type: 'folder', details: '文件夹' },
            { name: '音乐', type: 'folder', details: '文件夹' },
            { name: '备份', type: 'folder', details: '文件夹' }
        ],
        '下载': [
            { name: '安装程序.exe', type: 'file', size: '50MB', details: '应用程序' },
            { name: '资料.zip', type: 'file', size: '10MB', details: '压缩文件' }
        ],
        '文档': [
            { name: '工作报告.docx', type: 'file', size: '15KB', details: 'Word 文档' },
            { name: '财务报表.xlsx', type: 'file', size: '20KB', details: 'Excel 工作表' }
        ]
    };
    
    // 当前路径和历史记录
    let currentPath = ['主页'];
    let historyIndex = 0;
    const history = [['主页']];
    
    // 获取当前目录内容
    function getCurrentDirectoryContent() {
        let content = fileSystem;
        for (let i = 0; i < currentPath.length; i++) {
            content = content[currentPath[i]];
            if (!content) break;
        }
        return content;
    }
    
    // 更新文件列表
    function updateFileList() {
        const fileList = document.querySelector('.file-list');
        const content = getCurrentDirectoryContent();
        
        if (!fileList || !Array.isArray(content)) return;
        
        fileList.innerHTML = '';
        
        content.forEach(item => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const icon = item.type === 'folder' ? '📁' : '📄';
            const fileDetails = item.type === 'folder' ? item.details : `${item.details} • ${item.size}`;
            
            fileItem.innerHTML = `
                <div class="file-checkbox-container">
                    <input type="checkbox" class="file-checkbox" data-file="${item.name}" data-type="${item.type}">
                </div>
                <div class="file-icon">${icon}</div>
                <div class="file-info">
                    <div class="file-name">${item.name}</div>
                    <div class="file-details">${fileDetails}</div>
                </div>
            `;
            
            // 添加点击事件
            fileItem.addEventListener('click', function(e) {
                if (!e.target.closest('.file-checkbox-container')) {
                    if (item.type === 'folder') {
                        // 进入文件夹
                        currentPath.push(item.name);
                        updateFileList();
                        updateAddressBar();
                        updateHistory();
                    } else {
                        // 打开文件
                        alert(`打开文件：${item.name}`);
                    }
                }
            });
            
            // 复选框点击事件
            const checkbox = fileItem.querySelector('.file-checkbox');
            checkbox.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            fileList.appendChild(fileItem);
        });
    }
    
    // 更新地址栏
    function updateAddressBar() {
        const addressBar = document.querySelector('.address-bar');
        if (!addressBar) return;
        
        addressBar.innerHTML = '';
        
        currentPath.forEach((path, index) => {
            if (index > 0) {
                const separator = document.createElement('span');
                separator.className = 'address-separator';
                separator.textContent = '>';
                addressBar.appendChild(separator);
            }
            
            const addressPart = document.createElement('span');
            addressPart.className = 'address-part';
            addressPart.textContent = path;
            
            // 添加点击事件，跳转到该路径
            addressPart.addEventListener('click', function() {
                currentPath = currentPath.slice(0, index + 1);
                updateFileList();
                updateAddressBar();
                updateHistory();
            });
            
            addressBar.appendChild(addressPart);
        });
    }
    
    // 更新历史记录
    function updateHistory() {
        // 移除当前索引之后的历史记录
        history.splice(historyIndex + 1);
        // 添加新路径到历史记录
        history.push([...currentPath]);
        // 更新历史索引
        historyIndex = history.length - 1;
        // 更新工具栏按钮状态
        updateToolbarButtons();
    }
    
    // 删除所选文件到回收站
    function deleteSelectedFiles() {
        const selectedCheckboxes = document.querySelectorAll('.file-checkbox:checked');
        
        if (selectedCheckboxes.length === 0) {
            alert('请先选择要删除的文件');
            return;
        }
        
        if (confirm(`确定要将${selectedCheckboxes.length}个项目删除到回收站吗？`)) {
            const content = getCurrentDirectoryContent();
            const pathString = currentPath.join('/');
            
            // 收集要删除的项目索引（从大到小排序，避免删除时索引变化）
            const indexesToDelete = Array.from(selectedCheckboxes)
                .map(checkbox => {
                    const fileName = checkbox.getAttribute('data-file');
                    return content.findIndex(item => item.name === fileName);
                })
                .filter(index => index !== -1)
                .sort((a, b) => b - a);
            
            // 执行删除
            indexesToDelete.forEach(index => {
                const item = content[index];
                // 添加到回收站
                addToRecycleBin(item, pathString);
                // 从文件系统中移除
                content.splice(index, 1);
            });
            
            // 更新显示
            updateFileList();
            updateToolbarButtons();
            
            alert(`已将${selectedCheckboxes.length}个项目删除到回收站`);
        }
    }
    
    // 为删除按钮添加事件监听
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteSelectedFiles);
    }
    
    // 更新工具栏按钮状态
    function updateToolbarButtons() {
        const backBtn = document.querySelector('.toolbar-buttons button:nth-child(1)');
        const forwardBtn = document.querySelector('.toolbar-buttons button:nth-child(2)');
        const deleteBtn = document.getElementById('deleteBtn');
        
        if (backBtn) {
            backBtn.disabled = historyIndex === 0;
            backBtn.style.opacity = historyIndex === 0 ? '0.5' : '1';
        }
        
        if (forwardBtn) {
            forwardBtn.disabled = historyIndex === history.length - 1;
            forwardBtn.style.opacity = historyIndex === history.length - 1 ? '0.5' : '1';
        }
        
        if (deleteBtn) {
            // 检查是否有选中的文件
            const selectedFiles = document.querySelectorAll('.file-checkbox:checked');
            deleteBtn.disabled = selectedFiles.length === 0;
            deleteBtn.style.opacity = selectedFiles.length === 0 ? '0.5' : '1';
        }
    }
    
    // 显示文件资源管理器
    function showExplorer() {
        if (explorerWindow) {
            explorerWindow.classList.add('active');
            // 将窗口置于最上层
            explorerWindow.style.zIndex = '1001';
            // 更新文件列表和地址栏
            updateFileList();
            updateAddressBar();
        }
    }

    // 窗口控制按钮功能
    const windowBtns = document.querySelectorAll('.window-btn');
    const taskbarCenter = document.querySelector('.taskbar-center');
    
    // 用于存储窗口的原始大小和位置
    const windowStates = new Map();
    
    windowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const windowElement = this.closest('.window');
            const windowId = windowElement.id;
            const btnType = this.classList[1];
            
            if (btnType === 'close') {
                windowElement.style.display = 'none';
                windowElement.classList.remove('maximized');
                
                // 从任务栏移除对应的任务项
                const taskItem = document.querySelector(`.taskbar-item[data-window="${windowId}"]`);
                if (taskItem) {
                    taskItem.remove();
                }
                
                // 清空存储的窗口状态
                windowStates.delete(windowId);
            } else if (btnType === 'minimize') {
                windowElement.style.display = 'none';
                
                // 确保任务栏中有对应的任务项
                let taskItem = document.querySelector(`.taskbar-item[data-window="${windowId}"]`);
                if (!taskItem) {
                    createTaskbarItem(windowElement);
                }
            } else if (btnType === 'maximize') {
                if (windowElement.classList.contains('maximized')) {
                    // 还原窗口
                    const state = windowStates.get(windowId);
                    if (state) {
                        windowElement.style.width = state.width;
                        windowElement.style.height = state.height;
                        windowElement.style.left = state.left;
                        windowElement.style.top = state.top;
                    }
                    windowElement.classList.remove('maximized');
                    this.textContent = '□';
                } else {
                    // 最大化窗口
                    // 保存当前状态
                    windowStates.set(windowId, {
                        width: windowElement.style.width,
                        height: windowElement.style.height,
                        left: windowElement.style.left,
                        top: windowElement.style.top
                    });
                    
                    // 最大化窗口
                    windowElement.style.width = `${window.innerWidth - 20}px`;
                    windowElement.style.height = `${window.innerHeight - 80}px`;
                    windowElement.style.left = '10px';
                    windowElement.style.top = '10px';
                    windowElement.classList.add('maximized');
                    this.textContent = '◱';
                }
            }
        });
    });
    
    // 创建任务栏项
    function createTaskbarItem(windowElement) {
        const windowId = windowElement.id;
        const windowTitle = windowElement.querySelector('.window-title span:last-child').textContent;
        const windowIcon = windowElement.querySelector('.window-title .window-icon').textContent;
        
        const taskItem = document.createElement('div');
        taskItem.className = 'taskbar-item';
        taskItem.setAttribute('data-window', windowId);
        taskItem.innerHTML = `
            <span class="taskbar-icon">${windowIcon}</span>
            <span class="taskbar-label">${windowTitle}</span>
        `;
        
        // 添加点击事件，恢复窗口
        taskItem.addEventListener('click', function() {
            const targetWindow = document.getElementById(windowId);
            if (targetWindow) {
                targetWindow.style.display = 'block';
                targetWindow.style.zIndex = getNextZIndex();
                
                // 从任务栏移除
                this.remove();
            }
        });
        
        taskbarCenter.appendChild(taskItem);
    }

    // 窗口拖动功能
    let isDragging = false;
    let offset = { x: 0, y: 0 };
    const windowHeaders = document.querySelectorAll('.window-header');

    windowHeaders.forEach(header => {
        header.addEventListener('mousedown', function(e) {
            isDragging = true;
            const windowElement = this.closest('.window');
            const rect = windowElement.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
            
            // 将窗口置于最上层
            windowElement.style.zIndex = '1001';
        });
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const windowElement = document.querySelector('.window.active');
        if (!windowElement) return;
        
        const x = e.clientX - offset.x;
        const y = e.clientY - offset.y;
        
        windowElement.style.left = `${x}px`;
        windowElement.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // 侧边栏点击事件
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他项的active状态
            sidebarItems.forEach(sidebarItem => sidebarItem.classList.remove('active'));
            // 添加当前项的active状态
            this.classList.add('active');
            
            // 更新当前路径
            const itemName = this.querySelector('span:last-child').textContent;
            currentPath = [itemName];
            updateFileList();
            updateAddressBar();
            updateHistory();
        });
    });
    
    // 工具栏按钮事件
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    toolbarBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (index === 0) {
                // 后退按钮
                if (historyIndex > 0) {
                    historyIndex--;
                    currentPath = [...history[historyIndex]];
                    updateFileList();
                    updateAddressBar();
                    updateToolbarButtons();
                }
            } else if (index === 1) {
                // 前进按钮
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    currentPath = [...history[historyIndex]];
                    updateFileList();
                    updateAddressBar();
                    updateToolbarButtons();
                }
            } else if (index === 2) {
                // 主页按钮
                currentPath = ['主页'];
                updateFileList();
                updateAddressBar();
                updateHistory();
            }
        });
    });
    
    // 初始化文件列表
    updateFileList();
    updateAddressBar();
    updateToolbarButtons();
});

// 回收站功能
const recycleBinWindow = document.getElementById('recycleBinWindow');
const recycleBinList = document.getElementById('recycleBinList');
const recycleBinEmpty = document.getElementById('recycleBinEmpty');
const restoreSelectedBtn = document.getElementById('restoreSelected');
const emptyRecycleBinBtn = document.getElementById('emptyRecycleBin');

// 回收站数据
let recycleBin = [];

function showRecycleBin() {
    recycleBinWindow.style.display = 'block';
    recycleBinWindow.style.zIndex = getNextZIndex();
    
    // 更新回收站内容
    updateRecycleBinDisplay();
}

function updateRecycleBinDisplay() {
    if (recycleBin.length === 0) {
        recycleBinList.style.display = 'none';
        recycleBinEmpty.style.display = 'flex';
        restoreSelectedBtn.disabled = true;
    } else {
        recycleBinList.style.display = 'block';
        recycleBinEmpty.style.display = 'none';
        restoreSelectedBtn.disabled = false;
        
        // 清空列表
        recycleBinList.innerHTML = '';
        
        // 添加回收站内的文件
        recycleBin.forEach((item, index) => {
            const binItem = document.createElement('div');
            binItem.className = 'recycle-bin-item';
            binItem.innerHTML = `
                <input type="checkbox" class="bin-item-checkbox" data-index="${index}">
                <div class="recycle-bin-item-info">
                    <div class="recycle-bin-item-name">${item.name}</div>
                    <div class="recycle-bin-item-path">原位置: ${item.path}</div>
                </div>
            `;
            
            recycleBinList.appendChild(binItem);
        });
    }
}

// 将文件添加到回收站
function addToRecycleBin(file, path) {
    recycleBin.push({
        name: file.name,
        type: file.type,
        size: file.size,
        path: path,
        details: file.details,
        deletedAt: new Date()
    });
    
    // 更新显示
    updateRecycleBinDisplay();
}

// 恢复所选项目
restoreSelectedBtn.addEventListener('click', function() {
    const selectedCheckboxes = document.querySelectorAll('.bin-item-checkbox:checked');
    
    if (selectedCheckboxes.length === 0) {
        alert('请先选择要恢复的项目');
        return;
    }
    
    // 收集要恢复的项目索引（从大到小排序，避免删除时索引变化）
    const indexesToRestore = Array.from(selectedCheckboxes)
        .map(checkbox => parseInt(checkbox.getAttribute('data-index')))
        .sort((a, b) => b - a);
    
    // 恢复项目
    indexesToRestore.forEach(index => {
        const item = recycleBin[index];
        // 这里可以添加实际的恢复逻辑，比如将文件放回原位置
        
        // 从回收站中移除
        recycleBin.splice(index, 1);
    });
    
    // 更新显示
    updateRecycleBinDisplay();
    
    alert(`已恢复 ${selectedCheckboxes.length} 个项目`);
});

// 清空回收站
emptyRecycleBinBtn.addEventListener('click', function() {
    if (recycleBin.length === 0) {
        alert('回收站已经是空的');
        return;
    }
    
    if (confirm('确定要永久删除回收站中的所有项目吗？')) {
        recycleBin = [];
        updateRecycleBinDisplay();
        alert('回收站已清空');
    }
});

// 模拟一些初始回收站数据
addToRecycleBin({ name: '报告.docx', type: 'document', size: '2.5 MB', details: '2023-10-15 创建' }, '文档/工作');
addToRecycleBin({ name: '照片.jpg', type: 'image', size: '1.2 MB', details: '2023-11-01 创建' }, '图片/家庭');
addToRecycleBin({ name: '项目计划.pdf', type: 'document', size: '3.8 MB', details: '2023-09-20 创建' }, '文档/项目');

// 右键菜单功能
const contextMenu = document.getElementById('contextMenu');
const desktop = document.querySelector('.desktop');

// 显示右键菜单
desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    // 定位菜单
    const x = e.clientX;
    const y = e.clientY;
    
    // 检查是否超出屏幕边界
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    let finalX = x;
    let finalY = y;
    
    if (x + menuWidth > screenWidth) {
        finalX = screenWidth - menuWidth;
    }
    
    if (y + menuHeight > screenHeight) {
        finalY = screenHeight - menuHeight;
    }
    
    // 显示菜单
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${finalX}px`;
    contextMenu.style.top = `${finalY}px`;
    contextMenu.style.zIndex = getNextZIndex();
});

// 点击其他地方隐藏右键菜单
document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target) && e.target !== desktop) {
        contextMenu.style.display = 'none';
    }
});

// 右键菜单项点击事件
contextMenu.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.context-menu-item');
    if (!menuItem) return;
    
    const itemId = menuItem.id;
    
    switch (itemId) {
        case 'cm-new':
            const newType = prompt('请选择新建类型:\n1. 文件\n2. 文件夹');
            if (newType === '1') {
                const fileName = prompt('请输入文件名:');
                if (fileName) {
                    alert(`已创建文件: ${fileName}`);
                }
            } else if (newType === '2') {
                const folderName = prompt('请输入文件夹名:');
                if (folderName) {
                    alert(`已创建文件夹: ${folderName}`);
                }
            }
            break;
        case 'cm-view':
            alert('当前视图模式: 中等图标');
            break;
        case 'cm-sort':
            const sortOptions = ['名称', '大小', '类型', '修改日期'];
            const sortChoice = prompt(`请选择排序方式:\n${sortOptions.map((opt, i) => `${i+1}. ${opt}`).join('\n')}`);
            const sortIndex = parseInt(sortChoice) - 1;
            if (sortIndex >= 0 && sortIndex < sortOptions.length) {
                alert(`已按${sortOptions[sortIndex]}排序`);
            }
            break;
        case 'cm-refresh':
            alert('桌面已刷新');
            break;
        case 'cm-personalize':
            alert('个性化设置已打开');
            break;
    }
    
    // 隐藏菜单
    contextMenu.style.display = 'none';
});