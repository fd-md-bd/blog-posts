import React from "react";
import content from "./content.md";
import withPrismCss from "../../../site/util/withPrismCss";

const Article = props => (
  <div>
    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

export default withPrismCss()(Article);
