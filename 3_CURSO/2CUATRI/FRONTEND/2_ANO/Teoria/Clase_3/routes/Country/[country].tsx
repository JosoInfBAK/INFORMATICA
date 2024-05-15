import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
<<<<<<< HEAD
import Country from "../../components/country.tsx";


=======
import { FunctionComponent } from 'preact';
import Country from "../../.vscode/components/Country.tsx";
>>>>>>> c28cad1bcec1ff5d77a4175e2f60e74410e12c32
export type Country = {
    capital: string;
    Population: string;
    Region: string;
       Moneda: string;   
};


export const handler:Handlers = {
    GET: async function (req:Request, ctx: FreshContext) {
        const country = ctx.params.country;
        //fetch data from the API
        const response = await fetch(`https://api.api-ninjas.com/v1/country/${country}`);
        if (response.status === 404) {
            return ctx.render({pais: "Not Found", status: 404});
        }
        const data = await response.json();
        return ctx.render({pais: data, status: 200});

    },
};
const Page = (props:PageProps & { pais:Country }) => {
<<<<<<< HEAD
        return (
            <Country {...props.pais} />
        );
    };
=======
    return (
        <Country {...props.pais} />
    );
};
>>>>>>> c28cad1bcec1ff5d77a4175e2f60e74410e12c32
