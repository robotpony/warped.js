#!/bin/bash

# Start local HTTP server and open test page
echo "Starting local server on http://localhost:8000"
echo "Opening test.html in browser..."

# Start server in background
python3 -m http.server 8000 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Open browser (works on macOS, Linux, Windows)
if command -v open > /dev/null; then
    open http://localhost:8000/
elif command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8000/
elif command -v start > /dev/null; then
    start http://localhost:8000/
else
    echo "Please open http://localhost:8000/ in your browser"
fi

echo "Server running with PID $SERVER_PID"
echo "Press Ctrl+C to stop the server"

# Keep script running and handle Ctrl+C
trap "echo 'Stopping server...'; kill $SERVER_PID; exit" INT
wait $SERVER_PID