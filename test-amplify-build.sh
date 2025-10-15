#!/bin/bash

# Test script to validate AWS Amplify build configuration
# This simulates the Amplify build process locally

echo "🚀 Testing AWS Amplify Build Configuration"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "amplify.yml" ]; then
    echo "❌ Error: Must be run from project root directory"
    exit 1
fi

echo "✅ Found project files"

# Test 1: Check workspace structure
echo ""
echo "📁 Testing workspace structure..."
if [ -d "packages/app" ]; then
    echo "✅ Found packages/app directory"
else
    echo "❌ Missing packages/app directory"
    exit 1
fi

# Test 2: Check package.json files
echo ""
echo "📦 Testing package.json files..."
if [ -f "packages/app/package.json" ]; then
    echo "✅ Found packages/app/package.json"
else
    echo "❌ Missing packages/app/package.json"
    exit 1
fi

# Test 3: Install dependencies (simulate preBuild)
echo ""
echo "🔧 Testing dependency installation..."
echo "Running: npm ci"
if npm ci; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Test 4: Check workspace dependencies
echo ""
echo "🔍 Testing workspace dependencies..."
echo "Running: npm list --workspace=modus-next-app"
if npm list --workspace=modus-next-app; then
    echo "✅ Workspace dependencies resolved"
else
    echo "❌ Failed to resolve workspace dependencies"
    exit 1
fi

# Test 5: Build the app (simulate build phase)
echo ""
echo "🏗️ Testing build process..."
echo "Running: npm run build --workspace=modus-next-app"
if npm run build --workspace=modus-next-app; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Test 6: Check build output
echo ""
echo "📋 Testing build output..."
if [ -d "packages/app/.next" ]; then
    echo "✅ Found .next build directory"
    echo "Build contents:"
    ls -la packages/app/.next/
    
    if [ -d "packages/app/.next/static" ]; then
        echo "✅ Found static assets"
    else
        echo "⚠️ Warning: No static assets found"
    fi
else
    echo "❌ Build output not found"
    exit 1
fi

# Test 7: Verify amplify.yml configuration
echo ""
echo "⚙️ Testing amplify.yml configuration..."
if grep -q "baseDirectory: packages/app/.next" amplify.yml; then
    echo "✅ amplify.yml correctly points to packages/app/.next"
else
    echo "❌ amplify.yml configuration issue"
    exit 1
fi

# Summary
echo ""
echo "🎉 Build Test Summary"
echo "===================="
echo "✅ Workspace structure: OK"
echo "✅ Dependencies: OK"
echo "✅ Build process: OK"
echo "✅ Build output: OK"
echo "✅ Amplify config: OK"
echo ""
echo "🚀 Your project is ready for AWS Amplify deployment!"
echo ""
echo "Next steps:"
echo "1. Commit these changes to your repository"
echo "2. Connect your repository to AWS Amplify"
echo "3. Use the amplify.yml configuration"
echo "4. Add environment variables in Amplify Console"
echo ""
echo "Environment variables to add in Amplify:"
echo "- NODE_VERSION=20"
echo "- NPM_CONFIG_PREFIX=/usr/local"
echo "- NEXT_TELEMETRY_DISABLED=1"
echo "- NODE_ENV=production"
