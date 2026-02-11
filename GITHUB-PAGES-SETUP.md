# GitHub Pages Deployment Guide

## Steps to Deploy on GitHub Pages

### Step 1: Merge Your Branch

First, you need to merge the feature branch into your main branch:

1. Go to GitHub: https://github.com/nlwtest2020/SSMP
2. You should see a prompt to create a Pull Request for `claude/build-learning-course-app-9m19H`
3. Click "Compare & pull request"
4. Review the changes and click "Create pull request"
5. Merge the pull request into `main` (or `master`)

**OR** if you prefer command line:

```bash
# Switch to main branch
git checkout main
git pull origin main

# Merge the feature branch
git merge claude/build-learning-course-app-9m19H

# Push to GitHub
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/nlwtest2020/SSMP
2. Click **Settings** (top right)
3. Click **Pages** in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` (or `master`) and `/ (root)`
   - Click **Save**

### Step 3: Wait for Deployment

GitHub will automatically build and deploy your site. This takes 1-3 minutes.

Your site will be available at:
```
https://nlwtest2020.github.io/SSMP/
```

### Step 4: Check Deployment Status

1. Go to the **Actions** tab in your repository
2. You'll see a "pages build and deployment" workflow running
3. Wait for the green checkmark ✓
4. Click the deployment link or visit your site URL

## Updating the Site

Any time you push changes to the `main` branch, GitHub Pages will automatically redeploy:

```bash
# Make changes to course-config.json or other files
git add .
git commit -m "Update course content"
git push origin main
```

The site will update automatically in 1-3 minutes.

## Adding YouTube Videos

Edit `course-config.json` and add your YouTube video IDs:

```json
{
  "youtube_id": "YOUR_VIDEO_ID_HERE"
}
```

Then commit and push to trigger redeployment.

## Custom Domain (Optional)

To use a custom domain:

1. Go to Settings → Pages
2. Under "Custom domain", enter your domain (e.g., `course.yourdomain.com`)
3. Add a CNAME record in your DNS settings pointing to: `nlwtest2020.github.io`
4. Wait for DNS propagation (up to 24 hours)
5. Enable "Enforce HTTPS" in GitHub Pages settings

## Troubleshooting

### Site not loading?
- Make sure `index.html` is in the root directory ✓ (it is)
- Check that GitHub Pages is enabled in Settings → Pages
- Wait a few minutes for the deployment to complete

### 404 Error?
- Verify the branch is set to `main` and root directory `/`
- Check the Actions tab for any failed deployments

### Content not updating?
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that your changes were pushed to the `main` branch
- Wait for the GitHub Actions workflow to complete

## Notes

- GitHub Pages is **completely free** for public repositories
- The site is served over HTTPS automatically
- No build step needed - it's a static site
- Updates are automatic when you push to the main branch
