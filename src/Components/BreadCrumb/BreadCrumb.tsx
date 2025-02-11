import { Link } from "react-router-dom";

import "./BreadCrumb.css"

const BreadCrumb: React.FC<{}> = () => {
    const link = window.location.pathname;
    const splits = link.split("/");

    const buildUrl = (index: number, arr: Array<string>): string => {
        let string = "";

        if (index == 0) {
            return "/";
        }

        for (let i = 0; i <= index; i++) {
            string += arr[i];
            if (i != index) {
                string += "/"
            }
        }

        return string;
    }

    return (
        <div className="breadcrumb">
            {
                splits.map((url, index, arr) => {
                    return (
                        <>
                        <Link to={buildUrl(index, arr)} className="breadcrumb__link">
                            {url == "" ? "Home" : url}
                        </Link>
                        {
                            (index != arr.length - 1) 
                            ? <p> / </p>
                            : <></>
                        }
                        </>
                        
                    )
                })
            }
        </div>
    )
}

export default BreadCrumb