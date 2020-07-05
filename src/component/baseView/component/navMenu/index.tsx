import * as React from 'react';
import {RouterHistory} from '@router';
import Listener from '@listener';
import {MenuConfig, MenuOpenKeysConfig} from '@config/MenuConfigComponent'
import './menu.scss'
import {Menus} from './menu';

/**
 * 菜单收缩展开尺寸
 */
const expansionWidth: string = '256px'

const shrinkWidth: string = '56px'

/**
 * 菜单栏目
 */
export default class Index extends React.Component {

    public _deviceEventEmitter: any

    public state = {
        collapsed: false,
        selectMenuKey: '',
        selectOpenKeys: MenuOpenKeysConfig,
        Menu: MenuConfig,
        collapsedOverflow: 'inherit',
        componentUpdate: ''
    }

    public componentDidMount(): void {
        this._deviceEventEmitter = PubSub.subscribe(Listener.NavMenuSidenav, this._OnCollapsed.bind(this));
        this._listen()
    }

    public componentWillMount(): void {
        PubSub.unsubscribe(this._deviceEventEmitter);
    }

    /**
     * 监听路由
     * @private
     */
    private _listen = () => {
        const routerHistory = RouterHistory;
        const wheel = () => {
            //菜单栏滚动条导航
            const activeElement: any = document.querySelectorAll('.rs-nav-item-active,.rs-dropdown-item-active');
            activeElement?.forEach((k: any, i: any, a: any) => {
                k?.scrollIntoView({block: 'end', inline: 'start', behavior: 'smooth'});
            })
        }
        this.setState({
            selectMenuKey: routerHistory?.location?.pathname
        }, () => {
            wheel()
        })
        //路由跳转监听
        routerHistory.listen((listener) => {
            this.setState({
                selectMenuKey: listener.pathname
            }, () => {
                wheel()
            })
        })
    }


    /**
     * 打开关闭
     * @private
     */
    public _OnCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    public render() {
        const {collapsedOverflow, selectOpenKeys, selectMenuKey, collapsed} = this.state
        return (
            <div className='app-sidebar'
                 style={
                     !collapsed ? {
                         overflow: 'auto',
                         width: expansionWidth
                     } : {overflow: collapsedOverflow, width: shrinkWidth}
                 }
            >
                <Menus selectOpenKeys={selectOpenKeys}
                       selectMenuKey={selectMenuKey}
                       collapsed={!this.state.collapsed}
                       item={this.state.Menu}/>
            </div>
        )
    }
}
