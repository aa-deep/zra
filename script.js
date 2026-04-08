// 夸赞主任的话语
const compliments = [
    '主任铲铲玩的真好！',
    '主任长得真帅！',
    '主任工作能力超强！',
    '主任领导有方！',
    '主任人超级好！',
    '主任决策果断！',
    '主任很有责任感！',
    '主任团队管理能力一流！',
    '主任说话很有魅力！',
    '主任很有幽默感！',
    '主任专业知识很丰富！',
    '主任对下属很关心！',
    '主任很有耐心！',
    '主任办事效率很高！',
    '主任很有创新精神！',
    '主任很有远见！',
    '主任很有亲和力！',
    '主任很有气质！',
    '主任运动细胞发达！',
    '主任多才多艺！',
    '主任穿衣品味很好！',
    '主任很有绅士风度！',
    '主任很会照顾人！',
    '主任很有爱心！',
    '主任很有正能量！',
    '主任很有领导力！',
    '主任很有智慧！',
    '主任很有担当！',
    '主任很有魄力！',
    '主任是我们的榜样！'
];

// 弹窗颜色类
const colorClasses = [
    'popup-color-1',
    'popup-color-2',
    'popup-color-3',
    'popup-color-4',
    'popup-color-5',
    'popup-color-6',
    'popup-color-7',
    'popup-color-8'
];

let popups = [];

// 初始化
function init() {
    // 初始生成大量弹窗
    generatePopups(50);
    
    // 确保DOM加载完成后再操作音频元素
    setTimeout(() => {
        const music = document.getElementById('bg-music');
        if (!music) {
            console.log('音频元素未找到');
            return;
        }
        
        console.log('音频元素已找到:', music);
        music.volume = 0.3;
        
        // 检查音频文件是否加载成功
        music.addEventListener('loadedmetadata', () => {
            console.log('音频文件加载成功，时长:', music.duration, '秒');
        });
        
        music.addEventListener('error', (e) => {
            console.log('音频加载错误:', e);
        });
        
        // 尝试自动播放
        music.play().catch(e => {
            console.log('自动播放失败，需要用户交互:', e);
            // 添加页面点击事件，用户点击后播放音乐
            document.addEventListener('click', function playOnClick() {
                console.log('用户点击页面，尝试播放音乐');
                music.play().catch(e => {
                    console.log('点击后播放失败:', e);
                    // 尝试直接设置currentTime并播放
                    music.currentTime = 0;
                    music.play().catch(e2 => console.log('第二次尝试播放失败:', e2));
                });
                // 移除事件监听器，避免重复触发
                document.removeEventListener('click', playOnClick);
            });
        });
    }, 100);
}

// 生成弹窗
function generatePopups(count = 5) {
    const container = document.getElementById('popups-container');
    
    for (let i = 0; i < count; i++) {
        const popup = createPopup();
        container.appendChild(popup.element);
        popups.push(popup);
    }
}

// 创建单个弹窗
function createPopup() {
    const popup = document.createElement('div');
    const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    
    popup.className = `popup ${colorClass}`;
    popup.innerHTML = `
        <div class="popup-header">
            <div class="popup-title">夸赞主任</div>
            <div class="popup-close">×</div>
        </div>
        <div class="popup-content">${compliment}</div>
    `;
    
    // 随机定位
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    
    // 随机旋转角度
    const rotation = (Math.random() - 0.5) * 20; // -10到10度
    popup.style.transform = `rotate(${rotation}deg)`;
    
    // 关闭功能
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popup.remove();
        popups = popups.filter(p => p.element !== popup);
    });
    
    // 拖拽功能
    makeDraggable(popup);
    
    return { element: popup };
}

// 使弹窗可拖拽
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // 获取鼠标初始位置
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // 鼠标移动时调用elementDrag
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // 计算新位置
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // 设置新位置
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // 停止移动
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 初始化
init();

// 定期自动生成弹窗，营造不断涌出来的效果
setInterval(() => {
    // 每次生成3-5个弹窗
    const count = Math.floor(Math.random() * 3) + 3;
    generatePopups(count);
}, 800);