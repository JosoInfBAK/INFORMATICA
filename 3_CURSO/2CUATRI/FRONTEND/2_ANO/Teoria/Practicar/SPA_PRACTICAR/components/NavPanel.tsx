import { useState } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import { Pages } from "../types.ts";
import { useEffect } from "preact/hooks";
import Axios from "npm:axios";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
type NavPanelProps = {
  Dogs: Signal<Pages>;
  Cats: Signal<Pages>;
  Animals: Signal<Pages>;
  page: Signal<Pages>;
};

const NavPanel: FunctionComponent<NavPanelProps> = ({ page }) => {
  const [navPanel, setNavPanel] = useState(false);
  return (
    <nav>
      <div
        class={`${page.value === Pages.Animals ? "selected" : ""}`}
        onClick={() => {
          page.value = Pages.Animals;
        }}
      >
        Animals
      </div>
        <div
            class={`${page.value === Pages.Dogs ? "selected" : ""}`}
            onClick={() => {
            page.value = Pages.Dogs;
            }}
        >
            Dogs
        </div>
        <div
            class={`${page.value === Pages.Cats ? "selected" : ""}`}
            onClick={() => {
            page.value = Pages.Cats;
            }}
        >
            Cats
        </div>
    </nav>
  );
};

export default NavPanel;
