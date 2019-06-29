# setTextGradient
Sets the Gradient of a TextNode, without effecting the Layout

<h3>Installation</h3>

<pre>
npm -i element-functions-set_text_gradient
</pre>

<h3>Description</h3>
Set the Gradient of a TextNode without effecting the Layout, you just pass in the class name into 
the function Element.setTextGradientClass then this will apply the same text gradient to all nested TextNode elements

<h3>Assign a Class</h3>

html
<pre>
&lt;div class="textGradient1" &gt;
TEST 1

  &lt;div class="textGradient2" &gt;
  TEST 2
  &lt;/iv&gt;

&lt;/div&gt;
</pre>

css
<pre>
.class_name{
background: -webkit-linear-gradient(0deg, #00FF00, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(0deg, #00FF00, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</pre>

js
<pre>
let ele = document.getElementById("textGradient1");
ele.setTextGradient();
ele.setTextGradientClass("class_name");
</pre>

<h3>Override a Child Element</h3>
html
<pre>
&lt;div class="textGradient1" &gt;
TEST 1

  &lt;div class="textGradient2" &gt;
  TEST 2
  &lt;/div&gt;

&lt;/iv&gt;
</pre>

css
<pre>
.class_name2
background: -webkit-linear-gradient(0deg, #00FF00, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(0deg, #00FF00, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</pre>

js
<pre>
let ele = document.getElementById("textGradient2");
ele.setTextGradient();
ele.setTextGradientClass("class_name2);
</pre>

Then this  gives you the most amount of freedom when creating gradients
