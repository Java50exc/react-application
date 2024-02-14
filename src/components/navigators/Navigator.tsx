import { ReactNode, useEffect } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import './navigators.css'

type Props = {
    links: Link[],
    style: string
}

export type Link = {
    path: string,
    name: string
    linkStyle: string
}
export const Navigator: React.FC<Props> = ({ links, style }) => {

    function getLinks(link: Link[]): ReactNode {
        return link.map((e, i) =>
            <li key={i}><NavLink className={e.linkStyle} to={e.path}>{e.name}</NavLink></li>)
    }

    return <div>
        <nav>
            <ul className={style}>
                {getLinks(links)}
            </ul>
        </nav>
        <Outlet />
    </div>
}



