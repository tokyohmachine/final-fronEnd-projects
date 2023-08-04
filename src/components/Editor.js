import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import $ from "jquery";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Highlight, themes } from "prism-react-renderer"
import styles from "./styles.module.css"; 


export default function Editor() {
  const [markdown, setMarkdown] = useState(`
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Here is some code, \`<div></div>\`, between two backticks.
  
\`\`\`JavaScript
// this is multi-line code:
  
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text bold... whoa!


Or italic.


Or... wait for it... both!


And feel free to go crazy crossing stuff out.

There's also [links](https://www.freecodecamp.org), and


> Block Quotes!


And if you want to get really crazy, even tables:


|Wild Header | Crazy Header | Another Header?|
|------------| ------------- | -------------|
|Your content can | be here, and it | can be here....|
|And here. | Okay. | I think we get it.|

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`);
    



    // Initialize the editor height to 200px
    $("#editor").height(200);

    // Handle the toggle for editor expansion
    $("#toggle-editor").on("click", () => {
      $("#toggle-editor").toggleClass("expanded");
      $("#editor").height(0).height($("#editor")[0].scrollHeight);
      $("#hide-editor").show();
      $("#toggle-editor").hide();
    });

    // Handle the toggle for editor collapse
    $("#hide-editor").on("click", () => {
      $("#editor").height(200);
      $("#toggle-editor").show();
      $("#hide-editor").hide();
    });

    $("#toggle-preview").on("click", () => {
      $(".editor-container").hide();
      $("#hide-preview").show();
      $("#toggle-preview").hide();
    });

    // Handle the toggle for preview collapse
    $("#hide-preview").on("click", () => {
      $(".editor-container").show();
      $("#toggle-preview").show();
      $("#hide-preview").hide();
    });
  

    const handleEditorChange = (e) => {
      setMarkdown(e.target.value);
    }

    

    return (
      <>
        <div className="editor-container">
          <div className="title">
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
            <h2 className="col">Editor</h2>
            <i id="toggle-editor" className="fa fa-arrows-alt"></i>
            <i id="hide-editor" className="fa fa-compress"></i>
          </div>

          <textarea
            id="editor"
            autoFocus
            className="textarea"
            
            value={markdown}
            onChange={handleEditorChange}
          />
        </div>

        <div className="preview-container">
          <div className="title">
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
            <h2 className="col">Preview</h2>
            <i id="toggle-preview" className="fa fa-arrows-alt"></i>
            <i id="hide-preview" className="fa fa-compress"></i>
          </div>
          {/* PREVIEW */}
          <div id="preview" className="input">
          <ReactMarkdown
            children={markdown}
            className="input"
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                // const customTheme = {
                //   ...themes.shadesOfPurple,
                //   plain: {
                //     ...themes.shadesOfPurple.plain,
                //     fontFamily: 'monospace',
                //     fontSize: '14px',
                    
                //   },
                //   /* Add more style overrides for tokens if needed */
                // };

                return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                language={match[1]}
                style={docco}
                // codeTagProps={{ style: customTheme.plain }}
              >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote style={{ borderLeft: "4px solid blue", marginLeft: "20px", paddingLeft: "10px", color: "blue" }}>
            {children}
          </blockquote>
        ),
        ul: ({ node, ...props }) => {
          const marginLeft = `${node.depth * 20}px`;
          const style = {
            paddingLeft: '30px', 
            marginLeft, 
            marginBottom: '10px',
            overflowWrap: 'break-word', 
          };
          return <ul {...props} style={style} />;
        },
        ol: ({ node, ...props }) => {
          const marginLeft = `${node.depth * 20}px`;
          const style = {
            paddingLeft: '30px', 
            marginLeft, 
            marginBottom: '10px',
            overflowWrap: 'break-word', 
          };
          return <ol {...props} style={style} />;
        },
        img: ({node, ...props}) => {
          const style = {
            displayBlock: '30px', 
            marginRight: '20px', 
            marginLeft: '20px',
            width: '90%',
            marginTop: '15px' ,
          };
          return <img alt={props.alt || ''} {...props} style={style} />;
        },
       
      
      }}

      
    />
        </div>
          
        </div>
      </>
    );
  
}

