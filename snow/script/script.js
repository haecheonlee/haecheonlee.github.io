(function() {
    init();
}());

function init() {
    const container = document.getElementsByClassName("container")[0];
    const cloud = document.getElementsByClassName("cloud")[0];
    const snowAnimationTimeInSecond = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--snow-animation-time-in-second"));
    const parsedSnowAnimationTimeInMs = isNaN(snowAnimationTimeInSecond) ? 0 : (snowAnimationTimeInSecond * (10**3));

    setInterval(function() {
        const snowElement = addSnow(container, cloud);
        removeElementAfterAnimation(snowElement, parsedSnowAnimationTimeInMs);
    }, 50);
}   

function addSnow(container, cloud) {
    const { x: containerPosX } = container.getBoundingClientRect();
    const { x: cloudPosX, width: cloudWidth } = cloud.getBoundingClientRect();
    const padding = 25;
    const cloudStartX = cloudPosX - containerPosX;
    const snowPosLeft = cloudStartX + padding;
    const snowPosRight = cloudStartX + cloudWidth - padding;
    const snowElement = makeSnow(snowPosLeft, snowPosRight);

    container.append(snowElement);

    return snowElement;
}

function removeElementAfterAnimation(snowElement, animationTimeInMs) {
    setTimeout(() => {
        snowElement.remove();
    }, animationTimeInMs)
}

function makeSnow(cloudLeft, cloudRight) {
    const snowElement = document.createElement("span");
    const opacityBetweenHalfAndOne = getRandomValueBetweenTwoNumber(0.5, 1);
    const snowPositionInCloud = getRandomValueBetweenTwoNumber(cloudLeft, cloudRight);

    snowElement.classList.add("snow");
    snowElement.style.opacity = opacityBetweenHalfAndOne;
    snowElement.style.left = `${snowPositionInCloud}px`;

    return snowElement;
}

function getRandomValueBetweenTwoNumber(min, max) {
    return Math.random() * (max - min) + min;
}