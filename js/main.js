(() => {
  let yOffset = 0; // window.pageYOffset대신 쓸 변수
  let prevScrollHeight = 0; //현재스크롤위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) Scene(scroll-section)

  const sceneInfo = [
    {
      //0
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        conatainer: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector(".#scroll-section-0 main-message.a"),
        messageB: document.querySelector(".#scroll-section-0 main-message.b"),
        messageC: document.querySelector(".#scroll-section-0 main-message.c"),
        messageD: document.querySelector(".#scroll-section-0 main-message.d"),
      },
    },
    {
      //1
      type: "normal",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        conatainer: document.querySelector("#scroll-section-1"),
      },
    },
    {
      //2
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        conatainer: document.querySelector("#scroll-section-2"),
      },
    },
    {
      //3
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        conatainer: document.querySelector("#scroll-section-3"),
      },
    },
  ];
  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.conatainer.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    // 새로고침시 해당 위치 스크롤을 계산
    yOffset = window.scrollY;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }
  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("resize", setLayout());
  window.addEventListener("load", setLayout());
  //   window.addEventListener("DOMContentLoaded", setLayout());
})();
