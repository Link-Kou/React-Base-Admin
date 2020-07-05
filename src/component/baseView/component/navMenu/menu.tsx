import * as React from 'react';
import {Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import {RouterHistory} from '@router';
import {IDropdown, IDropdownItem, IDropdownMenu, IMenuConfig, INavItem} from '@config/MenuConfigComponent';


/**
 *
 * @author lk
 * @date 2020/7/5 11:50
 * @version 1.0
 */
export const Menus = (props: { selectOpenKeys: any, selectMenuKey: any, collapsed: any, item: any }) => {
    const {selectOpenKeys, selectMenuKey, collapsed, item} = props
    /**
     * 拥有权限的菜单
     * @param key 表示
     * @param comp 组件
     */

    const menuAuth: any = React.useCallback((key: string, comp: any) => {
        return comp
    }, []);

    /**
     * Icons 渲染
     * @param ico
     */
    const icons: any = React.useCallback((ico: any) => {
        return typeof ico === 'string' ? <Icon icon={ico as any}/> : ico
    }, [])


    /**
     * 渲染子项目
     * @param items
     */
    const renderItems: any = React.useCallback((items: Array<IDropdownMenu | IDropdownItem>) => {
        return items.map((k, i, a) => {
            switch (k.type) {
                case 'DropdownMenu':
                    if (items.length > 0) {
                        //icon={<Icon icon={String(k.ico)}/>}
                        return menuAuth(
                            k.key,
                            <Dropdown.Menu icon={icons(k.ico)} eventKey={k.key} title={k.title()}>
                                {renderItems(k.items)}
                            </Dropdown.Menu>
                        )
                    }
                    break;
                case 'DropdownItem':
                    return menuAuth(
                        k.key,
                        <Dropdown.Item className={'app-dropdown-Item-text'} eventKey={k.route} icon={icons(k.ico)}
                                       onClick={() => {
                                           RouterHistory.push(k.route)
                                       }}>
                            <span>{k.content}</span>
                        </Dropdown.Item>
                    )
                default:
                    return null;
            }
        })
    }, [])

    return (
        <Sidenav className={'app-Sidenav'}
                 defaultOpenKeys={selectOpenKeys}
                 activeKey={selectMenuKey}
                 appearance="inverse"
                 expanded={collapsed}
        >
            <Sidenav.Body>
                <Nav pullRight={true}>
                    {
                        item.map((k: IMenuConfig, i: number, a: Array<any>) => {
                            const {type, ico} = k.type as INavItem | IDropdown
                            const {route, content} = k.type as INavItem
                            const {items, title} = k.type as IDropdown
                            switch (type) {
                                case 'Dropdown':
                                    if (items?.length > 0) {
                                        return menuAuth(
                                            k.key,
                                            <Dropdown placement="rightStart" eventKey={k.key}
                                                      icon={icons(ico)}
                                                      title={title()}>
                                                {renderItems(items)}
                                            </Dropdown>
                                        )
                                    }
                                    break;
                                case 'DropdownMenu':
                                    if (items.length > 0) {
                                        return menuAuth(
                                            k.key,
                                            <Dropdown.Menu icon={icons(ico)} eventKey={k.key} title={title()}>
                                                {renderItems(items)}
                                            </Dropdown.Menu>
                                        )
                                    }
                                    break;
                                case 'NavItem':
                                    return menuAuth(
                                        k.key,
                                        <Nav.Item className={'app-dropdown-Item-text'} eventKey={route}
                                                  icon={icons(ico)}
                                                  onClick={() => {
                                                      RouterHistory.push(route)
                                                  }}>
                                            <span>{content}</span>
                                        </Nav.Item>
                                    )
                                default:
                                    return null
                            }
                        })
                    }
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    )
}
