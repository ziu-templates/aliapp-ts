import "./style";
import { PageBase } from "mipp-ali";

export default class Index
  extends PageBase<IIndexData>
  implements IMippAliPage.ILifetime {
  data: IIndexData = {
    welcomeStr: "Index Page",
  };

  onLoad(): void {
    console.log("onLoad: ", this);
  }
}

Page(new Index());
