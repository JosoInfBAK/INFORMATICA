type Props = {
  Destinos: any;
}

export default function MenuLateral( props: Props) {
    function openNav() {
        document.getElementById("sideNavigation")!.style.width = "250px";
        document.getElementById("main")!.style.marginLeft = "250px";
      
    }
    function closeNav() {
        document.getElementById("sideNavigation")!.style.width = "0";
        document.getElementById("main")!.style.marginLeft = "0";
    }
  return (
    <div>
      <div id="sideNavigation" className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={()=>closeNav()}>
          &times;
        </a>
        <h1 className="DestinosTitulo">Destinos</h1>
        {props.Destinos.map((d:any) => (<div key={d.id} className="destinoContainer"><a href={`/viaje_detallado/${d.id}`}>{d.name}</a></div>))}
      </div> 
      <div className="topnav">
        <a href="#" onClick={()=>openNav()}>
          <svg width="30" height="30" id="icoOpen">
            <path d="M0,5 30,5" stroke="#000" stroke-width="5" />
            <path d="M0,14 30,14" stroke="#000" stroke-width="5" />
            <path d="M0,23 30,23" stroke="#000" stroke-width="5" />
          </svg>
        </a>
      </div>

      <div id="main"></div>
    </div>
  );
}
