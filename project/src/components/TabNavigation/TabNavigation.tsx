import React, { useState } from 'react'
import { TabNavBar, TabNavLi, TabNavLink, TabNavWrapper } from './tabNavigationStyle'
import { Link } from 'react-router-dom'

const TabNavigation = ({ tabNavigationOptions }) => {
    const [tabActive, setTabActive] = useState(0)

    return (
        <TabNavWrapper>
            <TabNavBar>
                {tabNavigationOptions.map((item, i) => {
                    return (
                        <TabNavLi>
                            <Link to={item.path}>
                                <TabNavLink
                                    onClick={() => { setTabActive(i) }}
                                    tabActive={tabActive === i}>{item.name}</TabNavLink>
                            </Link>
                        </TabNavLi>
                    )
                })}
            </TabNavBar>
        </TabNavWrapper >

    )
}

export default TabNavigation
