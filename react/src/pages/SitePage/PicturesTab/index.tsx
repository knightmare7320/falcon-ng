import "./index.css";

function getText(cascadeCode:string, picture:string) {
  // const string = await fetch(`/pictures/text/${cascadeCode}/${picture}`);
  return "test";
}

export default function PicturesTab({cascadeCode, pictures}:{cascadeCode:string, pictures:string[]}) {
  return <>
    { pictures.map(
      (picture, index) =>
        <div className="responsive">
          <div className="gallery">
            <img src={`/pictures/image/${cascadeCode}/${picture}?width=800&height=800" alt="Site Picture`} width="600" height="400" key={index} />
            <div className="desc">{getText(cascadeCode, picture)}</div>
          </div>
        </div>
    )}

    <div className="clearfix"></div>
  </>;
}