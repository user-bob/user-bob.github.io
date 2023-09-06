// @ts-nocheck

import { DeepPartial, FlowbiteNavbarRootTheme, useTheme } from "@/components";
import { mergeDeep } from "@/helpers/merge-deep";
import { ComponentProps, FC, PropsWithChildren, useEffect, useState } from "react";
import {
  SearchContent,
  SearchPaletteActiveTheme,
  SearchPaletteInputTheme,
  SearchPaletteResultsTheme,
} from "./SearchContent";
import { SearchHandler, SearchHandlerTheme } from "./SearchHandler";

import { usePathname, useSearchParams } from "next/navigation";
import { SearchContext } from "./SearchContext";

export interface SearchPaletteTheme {
  root: SearchPaletteRootTheme;
  handler: SearchHandlerTheme;
  input: SearchPaletteInputTheme;
  results: SearchPaletteResultsTheme;
  active: SearchPaletteActiveTheme;
}

export interface SearchPaletteRootTheme {
  base: string;
  overlay: string;
  dialog: string;
}

export interface SearchPaletteProps extends PropsWithChildren, ComponentProps<"div"> {
  paletteOpen?: boolean;
  theme?: DeepPartial<FlowbiteNavbarRootTheme>;
}

const SearchPalette: FC<SearchPaletteProps> = ({
  paletteOpen,
  children,
  theme: customTheme = {},
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(paletteOpen);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [query, setQuery] = useState("");
  const theme = mergeDeep(useTheme().theme.search, customTheme);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setIsSearchPage(pathname === "/search");
    if (pathname === "/search") {
      setQuery(searchParams.get("q") || "");
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        setIsOpen(true);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider
      value={{ isOpen, setIsOpen, query, setQuery, isSearchPage, setIsSearchPage }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchPalette.displayName = "Search";
SearchContent.displayName = "Search.Content";
SearchHandler.displayName = "Search.Handler";

export const Search = Object.assign(SearchPalette, {
  Content: SearchContent,
  Handler: SearchHandler,
});
