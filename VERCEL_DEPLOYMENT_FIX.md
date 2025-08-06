# TinaCMS Vercel Deployment Fix

## Issues Fixed

1. **API Routes**: Moved from `pages/api/` to `app/api/` for Next.js 14+ App Router compatibility
2. **Environment Variables**: Updated to use correct branch name
3. **Vercel Configuration**: Updated function paths and timeouts

## Steps to Fix Your Deployment

### 1. Update Vercel Environment Variables

Go to your Vercel project settings and update these environment variables:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=ebb20b99-d45a-4ba2-8f1e-8461e821fde9
TINA_TOKEN=2c23294c4d1c8174c22fa5ca648cc30f1b75f9fc
TINA_PUBLIC_IS_LOCAL=false
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
GITHUB_OWNER=di-ray
GITHUB_REPO=site_diray
NEXT_PUBLIC_TINA_BRANCH=dependabot/npm_and_yarn/multi-544f560e85
```

**Important**: Update `GITHUB_PERSONAL_ACCESS_TOKEN` with your actual GitHub token.

### 2. Deploy the Changes

Option A: **Redeploy Current Branch**
```bash
git add .
git commit -m "Fix TinaCMS API routes for Vercel deployment"
git push origin dependabot/npm_and_yarn/multi-544f560e85
```

Option B: **Merge to Main Branch (Recommended)**
```bash
# Switch to main branch
git checkout main
git pull origin main

# Merge the dependabot branch
git merge dependabot/npm_and_yarn/multi-544f560e85

# Push to main
git push origin main

# Update environment variable in Vercel to:
# NEXT_PUBLIC_TINA_BRANCH=main
```

### 3. Verify the Fix

After deployment:

1. Go to `https://www.diray.com.br/api/tina/graphql` - should return GraphQL schema
2. Go to `https://www.diray.com.br/admin` - TinaCMS admin should load
3. Try editing content - should work without errors

## What Was Wrong

1. **Missing App Router API**: The API routes were in `pages/api/` but Next.js 14+ with App Router requires them in `app/api/`
2. **Wrong Branch**: Environment variables pointed to `main` but site was deployed from dependabot branch
3. **Vercel Config**: Function paths were incorrect for the new structure

## Files Changed

- ✅ `app/api/tina/[...routes]/route.ts` - New App Router API route
- ✅ `vercel.json` - Updated function paths
- ✅ `tina/config.tsx` - Updated branch configuration
- ✅ `.env.production.example` - Updated environment variables

The GraphQL API should now be accessible at `/api/tina/graphql` and the admin panel should work correctly.
