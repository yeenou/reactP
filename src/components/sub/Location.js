import { useEffect, useRef, useState } from "react";

export default function Location(){
  let main = useRef(null);
  const {kakao} = window;
  const container = useRef(null);  
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);
  const path = process.env.PUBLIC_URL;  
  const info = [
    {
        title:"본점", 
        latlng : new kakao.maps.LatLng(37.50711796614849,126.7564159502457),
        imgSrc : path+'/img/marker1.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점1", 
        latlng : new kakao.maps.LatLng(33.450701, 126.570667),
        imgSrc : path+'/img/marker2.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점2", 
        latlng : new kakao.maps.LatLng(37.557527,126.9222836),
        imgSrc : path+'/img/marker3.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)}, 
    },
    {
      title:"지점3", 
      latlng : new kakao.maps.LatLng(37.557527,126.9222836),
      imgSrc : path+'/img/marker3.png', 
      imgSize : new kakao.maps.Size(231,99), 
      imgPos : {offset: new kakao.maps.Point(116, 99)}, 
    }
  ]; 
  
  const [mapInfo] = useState(info);
 
  useEffect(()=>{
    main.current.classList.add('on'); 
  },[]);  

  useEffect(()=>{    
    container.current.innerHTML = '';

    const options = {
      center: mapInfo[0].latlng,
      level: 3 
    }
    
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);
    
    new kakao.maps.Marker({
      map: map,
      position: mapInfo[index].latlng,
      title: mapInfo[index].title,
      image: new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
    }) 

    map.setCenter(mapInfo[index].latlng);
    const mapSet = () => map.setCenter(mapInfo[index].latlng);
    window.addEventListener('resize', mapSet);

    //지도 타입변경 컨트롤러 표시
    const mapType = new kakao.maps.MapTypeControl();
    map.addControl(mapType, kakao.maps.ControlPosition.TOPRIGHT);

    //휠로 줌기술 활성화 유무
    map.setZoomable(true);

    //마우스 드래그기능 활성화 유무
    map.setDraggable(true);

    return ()=> window.removeEventListener('resize', mapSet);
  },[index]); 

  return (
    <main className="content location" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Location</h1>
        <section>
          <div id="map" ref={container}></div>

          <div className="wrap">
            <nav className="branch">
              {mapInfo.map((data, idx)=>{
                return (
                  <button key={idx} onClick={()=>setIndex(idx)}>
                    <img src="" alt="" />
                    <div className="txt">
                      {data.title} <br />
                      <span>Lorem, ipsum.</span>
                      <p>Lorem ipsum dolor sit amet elit. Asperiores, sapiente.</p>
                    </div>
                  </button>
                )
              })}
            </nav>
            
            <nav className='traffic'>
              <button onClick={()=>{
                map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
              }}>교통정보 보기</button>
              
              <button onClick={()=>{
                map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
              }}>교통정보 끄기</button>
            </nav>
          </div>

          
        </section>
      </div>
    </main>
  )
}