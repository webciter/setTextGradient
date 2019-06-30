/*
 * setTextGradient
 *
 * create text gradients on an elements TextNode
 * 
 * @author David Clews
 * @version 1.0.0
 * @authorUrl http://davidclews.com
 * @repoUrl http://github.com/webciter/setTextGradient
 * @licence MIT
 * 
 */

/*
Copyright 2019 David Clews
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


Element.prototype.setTextGradient = function(){
	
	let self = this;

	let wrappers = []; // save references to the wrappers

	let init = function(){
		createCSSRules();
		createGradient();
		self.hasTextGradientBranch = true; /* meaning this element controls a branch of textGradient wrappers */
	}
	
	/* createCSSRules
         * create the common CSS used in all text gradient classes
	 * @return {undefined}
	 */
	let createCSSRules = function(){
	
	// create the common CSS rule applied to all setGradientText
  	if(!document.getElementById("setGradientText_common_rules")){
		    let setGradientTextCommon = document.createElement("style");
		    setGradientTextCommon.id = "setGradientText_common_rules";
		    setGradientTextCommon.setAttribute("type", "text/css");
		    setGradientTextCommon.textContent = 
		    `
		    .textGradient{
			background-clip: text;
	  		-webkit-background-clip: text;
	  		color: transparent;
		     }
		    `;
		    document.getElementsByTagName("head")[0].appendChild(setGradientTextCommon)
		}
	}
	
	/*
	 * textNodeWalker
	 *
	 * get all the TextNode's in the children
	 * 
	 * @param {HTMLElement} el
	 * @return {array} An array of TextNode
	 */
	let textNodeWalker = function(el){
	  let n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
	  while(n=walk.nextNode()) a.push(n);
	  return a;
	}

	/* characterCount
	 *
	 * @param {string} str
	 * @return {integer} 
	 */
	let characterCount = function(str) {
  		return str.trim().length;
	}

	/*
	 * textNodeWrapper
	 *
	 * Wrap all TextNode with a span, which we use to extract the background for the effect
	 * @param {TextNode} textNode
	 * @return {undefined}
	 */
	let textNodeWrapper = function(textNode){


		if(characterCount(textNode.wholeText) >= 1){

			if(textNode.parentNode.classList.contains("textGradient") === true){
				
				textNodeUnwrapper(textNode.parentNode);
			}
			
				// create wrapper container
				var wrapper = document.createElement('span');

			
				wrapper.classList.add("textGradient");
				wrappers.push(wrapper);

				// insert wrapper before el in the DOM tree
				textNode.parentNode.insertBefore(wrapper, textNode);
				
				// move el into wrapper
				wrapper.appendChild(textNode);
		}
	}

	/*
	 * textNodeUnwrapper
	 *
	 * Unwrap a TextNode
	 *
	 * @param {HTMLElement} el
	 * @return {undefined}
	 */
	let textNodeUnwrapper = function(el){
	    var parent = el.parentNode; // get the element's parent node
	    while (el.firstChild){
		parent.insertBefore(el.firstChild, el); // move all children out of the element
	    }
	    parent.removeChild(el); // remove the empty element
	}

	

	/*
 	 * createGradient
	 *
	 * Creates a Linear gradient on the Text within the Element
	 * @return {undefined}
	 */
	let createGradient = function(){

		let textNodes = textNodeWalker(self);

		for(let i = 0;i<textNodes.length;i++){
			textNodeWrapper(textNodes[i]);

		}
	} 

	/* 
	 * setTextGradientClass
	 * sets the actual class used to apply the text gradient
	 * @return {undefined}
	 */
	self.setTextGradientClass = function(className){


		for(
			let i = 0;
			i<wrappers.length;
			i++){
			// remove old class for textGradient Styles
			let allClasses = Array.from(wrappers[i].classList)
			for(let a = 0;a<allClasses.length; a++){
				if(allClasses[a] !== "textGradient"){
					// check to see if the DOM still contains the Element
					if(self.contains(wrappers[i])){
						wrappers[i].classList.remove(allClasses[a]);
					}else{
						//remove from wrappers array, no longer needed
						wrappers.splice(i, 1);
						i--; // conpensate for this loop 
					}

				}
			}
			
			wrappers[i].classList.add(className);
		}
	}


	/* 
	 * destoryTextGradient
	 * remove the applied text gradient from the element 
	 * @return {undefined}
  	 */
	self.destroyTextGradient = function(){

		
		// remove the wrappers from the dom 
		for(let i = 0;i<wrappers.length;i++){
			//unwrap textnodes

			if(self.contains(wrappers[i])){
			console.log(wrappers[i]);
				textNodeUnwrapper(wrappers[i]);
			}

		}

		wrappers = [];
		self.hasTextGradientBranch = void 0;

		
	}

	init();
}
