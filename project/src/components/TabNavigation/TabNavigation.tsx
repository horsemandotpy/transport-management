import { useState } from 'react'
import { TabNavBar, TabNavLi, TabNavLink, TabNavWrapper } from './tabNavigationStyle'
import { Link } from 'react-router-dom'

const TabNavigation = ({ tabNavigationOptions }) => {
    const [tabActive, setTabActive] = useState(0)
    // remember fix those error to deploy.

    return (
        <TabNavWrapper>
            <TabNavBar>
                {tabNavigationOptions.map((item, i) => {
                    return (
                        <TabNavLi key={i}>
                            <Link to={item.path}>
                                <TabNavLink
                                    onClick={() => { setTabActive(i) }}
                                    // Why this is error ? You are leadking false to DOM if it false
                                    tabactive={tabActive === i ? "true" : ""}>{item.name}</TabNavLink>
                            </Link>
                        </TabNavLi>
                    )
                })}
            </TabNavBar>
        </TabNavWrapper >

    )
}

export default TabNavigation
