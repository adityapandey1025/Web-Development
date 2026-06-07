function customRender(reactElement,container){
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML=reactElement.Children;
    for (const prop in reactElement.props){
        domElement.setAttribute(prop,reactElement.props[prop]);
    }

    container.appendChild(domElement);
}


const mainContainer=document.querySelector("#root");
const reactElement={
    type:'a',
    props:{
        href:"https://www.youtube.com/watch?v=kAOuj6o7Kxs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=4" ,
        target : "_blank"
    },
    Children:"Click here to open yt link"
}
customRender(reactElement,mainContainer);
reactElement.type='h2';
customRender(reactElement,mainContainer);
reactElement.type='img'
reactElement.props.alt="No image found";
reactElement.props.src="";
customRender(reactElement,mainContainer)
