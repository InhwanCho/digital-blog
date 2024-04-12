import * as React from "react";
import { ActionImpl } from "kbar";

// Forward Ref 
const ResultItem = React.forwardRef(

  function ResultItem({ action, active}: { action: ActionImpl; active: boolean;},ref: React.Ref<HTMLDivElement>) {

    return (
      <div ref={ref} className={active ? `px-3 py-2 leading-none rounded text-violet-700 flex items-center justify-between bg-violet-200 dark:bg-violet-400` : `px-3 py-2 leading-none rounded flex items-center justify-between hover:bg-violet-200`} >
        <header className="flex items-center justify-center">
          <span>{action.icon}</span>
          <div className="rounded flex flex-col py-1.5 gap-0.5 items-start justify-center relative select-none outline-none ">
            <h1 className=""> {action.name} </h1>
            <p className="text-sm"> {action.subtitle} </p>
          </div>
        </header>
        <div className="text-[15px] leading-none text-violet11 rounded flex justify-between items-center relative select-none outline-none hover:bg-violet4">
          {action.shortcut?.length ? (
            <div
              aria-hidden
              style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
            >
              {action.shortcut.map((sc) => (
                <kbd
                  key={sc}
                  style={{
                    padding: "4px 6px",
                    background: "rgba(0 0 0 / .1)",
                    borderRadius: "4px",
                    fontSize: 14,
                  }}
                >
                  {sc}
                </kbd>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  });

export default ResultItem; 