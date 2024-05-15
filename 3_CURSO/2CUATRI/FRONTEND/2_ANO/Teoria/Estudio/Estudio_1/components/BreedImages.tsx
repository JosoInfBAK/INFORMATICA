import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.2/src/index.js";

const BreedImages: FunctionComponent<{ images: string[] }> = ({ images }) => {
  const reducedimages = images.slice(0, 3);
  return (
    <div className="BreedImagesComp">
      <h1 className="BreedsTitle">Images</h1>
      <div className="BreedName">
        <h1>{images[0].split("/")[4]}</h1>
      </div>
      <a className="BreedImages">
        {reducedimages.map((reducedimages) => (
          <img className="Image" src={reducedimages} />
        ))}
      </a>
    </div>
  );
};
export default BreedImages;
