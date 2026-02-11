# Deployment Guide

## Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New" → "Project"
3. Import the repository: `nlwtest2020/SSMP`
4. Select the branch: `claude/build-learning-course-app-9m19H`
5. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: Leave empty (static site)
6. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Link to existing project? No (or Yes if you've already created one)
# - Project name: ssmp-learning-course
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

## Adding YouTube Videos

To add YouTube video IDs, edit `course-config.json`:

1. Find the video sections (there are 3)
2. Replace the empty `youtube_id` field with your video ID
3. Example:
   ```json
   "youtube_id": "dQw4w9WgXcQ"
   ```
4. Commit and push:
   ```bash
   git add course-config.json
   git commit -m "Add YouTube video IDs"
   git push
   ```
5. Vercel will automatically redeploy

## Updating Content

All content can be updated by editing `course-config.json`:

- Quiz questions and answers
- Feedback messages
- Video information
- Section titles and descriptions

After editing, commit and push to trigger automatic redeployment.

## Custom Domain

To add a custom domain in Vercel:

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Vercel will automatically provision SSL

## Environment Variables

This app doesn't require any environment variables. It's fully static.

## Monitoring

Vercel provides:
- Real-time logs
- Analytics (page views, visitors)
- Performance metrics
- Error tracking

Access these in your Vercel dashboard under your project.
