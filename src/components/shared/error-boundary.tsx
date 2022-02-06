import React, { ErrorInfo } from 'react';

export default class ErrorBoundary extends React.Component<{}, {hasError: boolean}>{
    constructor(props:{}){
        super(props);
        this.state = { hasError: false }
    }

    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError(){
        return { hasError: true };
    }

    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error:Error, info:ErrorInfo){
        console.log("Возникла ошибка!", error, info);
    }

    render(){
        if (this.state.hasError){
            return (
                <section>
                    <h1>Что-то пошло не так :(</h1>
                    <p>В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.</p>
                </section>
            );
        }

        return this.props.children;
    }
    
}
