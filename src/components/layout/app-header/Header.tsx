import React from "react";
import './header.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "./nav-item/NavigationItem";

export interface IHeaderState{
    activeItem: string;
}

const CONSTRUCTOR = "Конструктор";
const ORDERS = "Лента заказов";
const PROFILE = "Личный кабинет";

export default class Header extends React.Component<any, IHeaderState>{
    constructor(props:any){
        super(props);
        this.state = {activeItem: CONSTRUCTOR}
    }

    onActiveItemChanged = (activeItem : string) => this.setState({...this.state, activeItem: activeItem});

    render(){
        return (<header className="header">
            <nav className="nav-bar">
                <NavigationItem text={CONSTRUCTOR} isActive={ this.isItemActive(CONSTRUCTOR) } onActiveItemChanged = {this.onActiveItemChanged}>
                    <BurgerIcon type={this.isItemActive(CONSTRUCTOR) ? "primary" : "secondary"} />
                </NavigationItem>

                <NavigationItem text={ORDERS} isActive={ this.isItemActive(ORDERS) } onActiveItemChanged = {this.onActiveItemChanged}>
                    <ListIcon type={this.isItemActive(ORDERS) ? "primary" : "secondary"} /> 
                </NavigationItem>
                
                <div className="logo"><Logo /></div>

                <NavigationItem text={PROFILE} isActive={ this.isItemActive(PROFILE) } className="ml-5" onActiveItemChanged = {this.onActiveItemChanged}>
                    <ProfileIcon type={this.isItemActive(PROFILE) ? "primary" : "secondary"} /> 
                </NavigationItem>                
            </nav>
        </header>);
    }

    private isItemActive = (item: string):boolean => item === this.state.activeItem;
}