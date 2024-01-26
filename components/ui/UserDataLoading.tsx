import { Card, CardContent, CardTitle, CardHeader } from "./card";
export function UserDataLoading() {
  return (
    <Card className="mx-auto flex flex-col max-w-2xl space-y-3">
          {/* SECTION TITLE */}
          <CardHeader>
            <CardTitle
              className={`font-bold text-2xl tracking-wider`}
            >
              User details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* USERNAME */}
            <div className="flex gap-1">
              <div
                className={`shimmer w-10 h-3`}
              >
                {/* USERNAME TAG */}
              </div>{" "}
              <div className={`shimmer w-20 h-3`}>
                {/* USERNAME */}
              </div>
            </div>

            {/* NAME */}
            <div className="flex gap-1">
              <div
                className={`shimmer w-10 h-3`}
              >
                {/* NAME TAG */}
              </div>{" "}
              <div className={`shimmer w-10 h-3`}>
                {/* NAME */}
              </div>
            </div>

            {/* PROFILE PICTURE */}
            <div className="flex gap-1">
              <div
                className={`shimmer w-10 h-3`}
              >
                {/* PROFILE PIC TAG */}
              </div>
              <div
                // IMAGE
                className="w-[50px] h-[50px] shimmer rounded-lg"
              />
            </div>

            {/* USER BIO */}
            <div className="flex gap-1">
              <div
                className={`shimmer w-10 h-3`}
              >
                {/* BIO TAG */}
              </div>{" "}
              <div className={`shimmer w-24 h-10`}>
                {/* BIO */}
              </div>
            </div>

            {/* LINK TO USER PAGE */}
            <div className="w-20 h-8 shimmer"/>
          </CardContent>
        </Card>
  );
}
