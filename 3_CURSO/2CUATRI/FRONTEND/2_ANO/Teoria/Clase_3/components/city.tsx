import { FunctionComponent } from 'preact';

type city = {
    name: string;
    population: string;
    country: string;
    region: string;
    currency: string;
}; 

const City: FunctionComponent<city> = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <h2>{props.population}</h2>
            <h3>{props.country}</h3>
            <h4>{props.region}</h4>
            <h5>{props.currency}</h5>
        </div>
    );
};
export default City;