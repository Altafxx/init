import { stackMiddlewares } from "@/middlewares/stackHandler";
import { withSample } from "./middlewares/withSample";

const middlewares = [withSample];
export default stackMiddlewares(middlewares);

// export default withAuth
