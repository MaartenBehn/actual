{ pkgs ? (import <nixpkgs> {}), ... }:

pkgs.mkShell rec {

  name = "";

  shellHook = ''
  # Bash commands to run when entering shell:
  '';

  packages = with pkgs; [
  # Programms installed in shell:
    nodejs
    yarn-berry
    yarn-berry.yarn-berry-fetcher
  ];

  buildInputs = with pkgs; [
  # Programms installed in LIBRARY_PATH (where gcc etc searches)
  ];

  LD_LIBRARY_PATH = with pkgs; lib.makeLibraryPath [
  # Programms installed in LD_LIBRARY_PATH (where dynamic linked libaries are searched)
  ];
}
