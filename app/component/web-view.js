import React from 'react'
import { WebView as RNWebView, Dimensions, Text } from 'react-native'

const script = `
;(function() {
var wrapper = document.createElement("div");
wrapper.id = "height-wrapper";
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(wrapper);
var i = 0;
function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
}
updateHeight();
window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
});
window.addEventListener("resize", updateHeight);
}());
`;

const style = `
body, html, #height-wrapper {
    margin: 0;
    padding: 0;
    font-size:14px;
}
#height-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
img{
    width:100%;
}
blockquote {
    padding: 0 0 0 15px;
    margin: 0 0 20px;
    border-left: 5px solid #eee;
}
`

const suffix = `
<style>${style}</style>
<script>${script}</script>
`;

const BODY_TAG_PATTERN = /\<\/ *body\>/;

function codeInject(html) {
    if (BODY_TAG_PATTERN.test(html) === false) {
        html = `<html><meta name="viewport" content="width=device-width"/><body>${html}</body></html>`
    }
    return html.replace(BODY_TAG_PATTERN, suffix + "</body>")
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class WebView extends React.Component {
    static defaultProps = {
        minHeight: 200,
        autoHeight: true,
        scrollEnabled: false,
        onNavigationStateChange: () => {}
    }
    constructor(props) {
        super(props)
        this.state = {
            realContentHeight: props.minHeight
        }
        this._handleNavigationStateChange = this._handleNavigationStateChange.bind(this)
    }
    _handleNavigationStateChange(navState) {
        if (navState.title) {
            const realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
            this.setState({ realContentHeight });
        }
        this.props.onNavigationStateChange(navState)
    }
    render() {
        let { source, autoHeight, style, scrollEnabled, minHeight, ...rest } = this.props
        if (!source) {
            return null
        }
        console.log(source.html)
        if (source.html) {
            source = {
                ...source,
                html: autoHeight ? codeInject(source.html) : source.html
            }
        }
        return <RNWebView source={source}  {...rest} 
        automaticallyAdjustContentInsets={false} javaScriptEnabled={true} 
        onNavigationStateChange={this._handleNavigationStateChange} 
        scrollEnabled={scrollEnabled} style={[style,{height: Math.max(this.state.realContentHeight, minHeight)}]} />
    }
}

export default WebView