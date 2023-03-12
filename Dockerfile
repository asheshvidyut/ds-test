FROM ruby:3.0.1
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update -y && apt-get -y dist-upgrade
ENV NODE_VERSION=14.17.4
ENV RUBY_VERSION=3.0.1
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN apt-get install -y \
      git \
      default-mysql-server \
      npm
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install
COPY package.json yarn.lock ./
RUN npm install
COPY . ./
ENTRYPOINT ["./docker-entrypoint.sh"]