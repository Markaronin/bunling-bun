tmux \
  new-session  "cd client; yarn dev ; read" \; \
  split-window "cd server; cargo run ; read" \; \
  select-layout even-horizontal