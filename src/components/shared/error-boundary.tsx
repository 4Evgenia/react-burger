import React from 'react';

export default class ErrorBoundary extends React.Component<any, {hasError: boolean}>{
    constructor(props: any){
        super(props);
        this.state = { hasError: false }
    }

    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError(){
        return { hasError: true };
    }

    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error :any, info: any){
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
