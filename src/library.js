
export const $ = (elementSeloctor) =>{return document.querySelector(elementSeloctor)}

// CreateElement(Element name, class name, Attributes name, Attributes value, Innre Text )
export const CreateElement = (elName,elClass=null,elAttrName=null,elAttrVal=null,elInnerText=null) =>{
            let el = document.createElement(elName);
            if(elClass!=null)el.className = elClass
            if(elAttrName != null){
                if(elAttrVal!=null){
                    el.setAttribute(elAttrName, elAttrVal)
                }else{
                    el.setAttribute(elAttrName, "")
                }
            }
            if(elInnerText!=null)el.innerHTML = elInnerText
            return el;
        }




