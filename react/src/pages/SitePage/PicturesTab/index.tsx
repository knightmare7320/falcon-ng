import "./index.css";

export default function PicturesTab({cascadeCode, pictures}:{cascadeCode:string, pictures:string[]}) {
  return <>
    <h2>Site Pictures</h2>
    {pictures.map(
      (picture, index) => {
        if (index === 0) {
          return <><img key={0} src={`/pictures/image/${cascadeCode}/${picture}?width=800&height=800`} alt={`${cascadeCode}/${picture}`}/> <br /></>
        } else {
          return <img key={index} src={`/pictures/image/${cascadeCode}/${picture}?width=200&height=200`} alt={`${cascadeCode}/${picture}`}/> 
        }
      }
    )}

    
  <div className="responsive">
    <div className="gallery">
      <img src="/pictures/image/CH03XC254/000?width=800&height=800" alt="Cinque Terre" width="600" height="400" />
      <div className="desc">6131 N Northwest Hwy</div>
    </div>
  </div>


  <div className="responsive">
    <div className="gallery">
      <img src="/pictures/image/CH03XC254/001?width=800&height=800" alt="Cinque Terre" width="600" height="400" />
      <div className="desc">Sector 1</div>
    </div>
  </div>

  <div className="responsive">
    <div className="gallery">
      <img src="/pictures/image/CH03XC254/002?width=800&height=800" alt="Cinque Terre" width="600" height="400" />
      <div className="desc">Sector 2</div>
    </div>
  </div>

  <div className="responsive">
    <div className="gallery">
    <img src="/pictures/image/CH03XC254/003?width=800&height=800" alt="Cinque Terre" width="600" height="400" />
    <div className="desc">Sector 3</div>
    </div>
  </div>

  <div className="clearfix"></div>
  </>;
}