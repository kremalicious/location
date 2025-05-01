# location

> Microservice API endpoint to fetch and expose my location.

**Table of Contents**

- [🏄 Usage](#-usage)
- [⬆️ Deployment](#️-deployment)
- [Development](#development)
- [🏛 License](#-license)

## 🏄 Usage

Location is currently fetched from my (private) nomadlist.com profile & Foursquare/Swarm check-ins, making sure any API keys are hidden from any browser, and only the relevant location data is exposed.

```text
https://location.kremalicious.com
```

Used to display location on my [portfolio](https://matthiaskretschmann.com) & [blog](https://kremalicious.com).

## ⬆️ Deployment

Every branch or Pull Request is automatically deployed by [Vercel](https://vercel.com) with their GitHub integration. A link to a deployment will appear under each Pull Request.

## Development

Requires env vars:

- `NOMADLIST_PROFILE`
- `NOMADLIST_KEY`
- `FOURSQUARE_KEY`

```bash
npm run dev

# fetches all Foursquare/Swarm checkins and writes them out to checkins.json
npm run get-checkins
```

## 🏛 License

```text
Copyright (c) 2025 Matthias Kretschmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
