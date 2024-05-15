import { FunctionComponent } from 'preact';
type CountryProps = {
    capital: string;
    Population: string;
    Region: string;
    Moneda: string;
};

const Country: FunctionComponent<CountryProps> = (props) => {
    return (
        <div>
            <h1>{props.capital}</h1>
            <h2>{props.Population}</h2>
            <h3>{props.Region}</h3>
            <h4>{props.Moneda}</h4>
        </div>
    );
};

export default Country;