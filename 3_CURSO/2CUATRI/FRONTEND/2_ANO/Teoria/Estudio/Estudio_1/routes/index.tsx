// Code to display the home page of the application
export default function Home() {
  return (
    <div>
      <div className="TopPanel">
        <h1 className="MainTitle">Dogs</h1>
      </div>
      <div className="MainPanel">
        <div className="LinksContainer">
          <a className="Link" href="/AllBreeds">All Breeds</a>
          <a className="Link" href="/RandomImage">Random Image</a>
          <a className="Link" href="/BreedSearch">Search By Breed</a>
        </div>
      </div>
    </div>
  );
}
