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
  </>;
}