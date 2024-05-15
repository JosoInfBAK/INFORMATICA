import { Handlers, PageProps,FreshContext } from "$fresh/server.ts";
import re from "https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs";

type Ciudad = {
    Country: string;
    Population: string;
    Latitude: string;
    Longitude: string;
    Capital: string;    
};
type Pais = {
    Capital: string;
    Population: string;
    Region: string;
    Moneda: string;
};

export const handler:Handlers = {
    GET: async function (req:Request, ctx: FreshContext) {
        const url = new URL(req.url);
        const SearchCountry = url.searchParams.get("SearchCountry");
        const SearchCity = url.searchParams.get("SearchCity");

        if (!SearchCity && !SearchCountry) {
           return ctx.render({pais:[],search:""});
        }
        if (SearchCountry) {
            return new Response("", {
                status: 307,
                headers: { Location: `/Country/${SearchCountry}`}});
        }
        if (SearchCity) {
            return new Response("", {
                status: 307,
                headers: { Location: `/City/${SearchCity}`}});
        }
        return ctx.render({pais:[],search:""});
    },
};


const Page = (props:PageProps) => {
    return (
        <div>
           <form action="/search" method="get">
            Introduce el nombre del Pais: &nbsp;
            <input type="text" name="SearchCountry" defaultValue={props.data.search}/>
            <button type="submit">Buscar</button>
            <form action="/Country" method="get">
           </form>
              </form>
                <form action="/search" method="get">
            Introduce el nombre de la Ciudad: &nbsp;
            <input type="text" name="SearchCity" defaultValue={props.data.search}/>
            <button type="submit">Buscar</button>
             </form>
        </div>
    );
};
export default Page;
