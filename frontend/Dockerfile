FROM node:18-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_BACKEND1_BASE_URL
ARG VITE_BACKEND2_BASE_URL

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_BACKEND1_BASE_URL=$VITE_BACKEND1_BASE_URL
ENV VITE_BACKEND2_BASE_URL=$VITE_BACKEND2_BASE_URL

# Now, the yarn build command can access the environment variables
RUN yarn build

# Stage 2: Production (Nginx)
FROM nginx:1.27.5-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html/
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]