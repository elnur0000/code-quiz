FROM node:12.14.1 as base


RUN apt-get update && apt-get install -y --no-install-recommends \ 
    ca-certificates \
    curl \
    build-essential \
	default-jdk\
	python2.7\
    netbase \
	&& rm -rf /var/lib/apt/lists/*
# # Java
# # Default to UTF-8 file.encoding
# ENV LANG C.UTF-8

# ENV JAVA_HOME /usr/local/openjdk-11
# ENV PATH $JAVA_HOME/bin:$PATH

# # backwards compatibility shim
# RUN { echo '#/bin/sh'; echo 'echo "$JAVA_HOME"'; } > /usr/local/bin/docker-java-home && chmod +x /usr/local/bin/docker-java-home && [ "$JAVA_HOME" = "$(docker-java-home)" ]

# # https://adoptopenjdk.net/upstream.html
# # >
# # > What are these binaries?
# # >
# # > These binaries are built by Red Hat on their infrastructure on behalf of the OpenJDK jdk8u and jdk11u projects. The binaries are created from the unmodified source code at OpenJDK. Although no formal support agreement is provided, please report any bugs you may find to https://bugs.java.com/.
# # >
# ENV JAVA_VERSION 11.0.6
# ENV JAVA_BASE_URL https://github.com/AdoptOpenJDK/openjdk11-upstream-binaries/releases/download/jdk-11.0.6%2B10/OpenJDK11U-jdk_
# ENV JAVA_URL_VERSION 11.0.6_10
# # https://github.com/docker-library/openjdk/issues/320#issuecomment-494050246
# # >
# # > I am the OpenJDK 8 and 11 Updates OpenJDK project lead.
# # > ...
# # > While it is true that the OpenJDK Governing Board has not sanctioned those releases, they (or rather we, since I am a member) didn't sanction Oracle's OpenJDK releases either. As far as I am aware, the lead of an OpenJDK project is entitled to release binary builds, and there is clearly a need for them.
# # >

# RUN set -eux; \
# 	\
# 	dpkgArch="$(dpkg --print-architecture)"; \
# 	case "$dpkgArch" in \
# 		amd64) upstreamArch='x64' ;; \
# 		arm64) upstreamArch='aarch64' ;; \
# 		*) echo >&2 "error: unsupported architecture: $dpkgArch" ;; \
# 	esac; \
# 	\
# 	savedAptMark="$(apt-mark showmanual)"; \
# 	apt-get update; \
# 	apt-get install -y --no-install-recommends \
# 		dirmngr \
# 		gnupg \
# 		wget \
# 	; \
# 	rm -rf /var/lib/apt/lists/*; \
# 	\
# 	wget -O openjdk.tgz.asc "${JAVA_BASE_URL}${upstreamArch}_linux_${JAVA_URL_VERSION}.tar.gz.sign"; \
# 	wget -O openjdk.tgz "${JAVA_BASE_URL}${upstreamArch}_linux_${JAVA_URL_VERSION}.tar.gz" --progress=dot:giga; \
# 	\
# 	export GNUPGHOME="$(mktemp -d)"; \
# # TODO find a good link for users to verify this key is right (https://mail.openjdk.java.net/pipermail/jdk-updates-dev/2019-April/000951.html is one of the only mentions of it I can find); perhaps a note added to https://adoptopenjdk.net/upstream.html would make sense?
# # no-self-sigs-only: https://salsa.debian.org/debian/gnupg2/commit/c93ca04a53569916308b369c8b218dad5ae8fe07
# 	gpg --batch --keyserver ha.pool.sks-keyservers.net --keyserver-options no-self-sigs-only --recv-keys CA5F11C6CE22644D42C6AC4492EF8D39DC13168F; \
# # also verify that key was signed by Andrew Haley (the OpenJDK 8 and 11 Updates OpenJDK project lead)
# # (https://github.com/docker-library/openjdk/pull/322#discussion_r286839190)
# 	gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys EAC843EBD3EFDB98CC772FADA5CD6035332FA671; \
# 	gpg --batch --list-sigs --keyid-format 0xLONG CA5F11C6CE22644D42C6AC4492EF8D39DC13168F \
# 		| tee /dev/stderr \
# 		| grep '0xA5CD6035332FA671' \
# 		| grep 'Andrew Haley'; \
# 	gpg --batch --verify openjdk.tgz.asc openjdk.tgz; \
# 	gpgconf --kill all; \
# 	rm -rf "$GNUPGHOME"; \
# 	\
# 	mkdir -p "$JAVA_HOME"; \
# 	tar --extract \
# 		--file openjdk.tgz \
# 		--directory "$JAVA_HOME" \
# 		--strip-components 1 \
# 		--no-same-owner \
# 	; \
# 	rm openjdk.tgz*; \
# 	\
# # TODO strip "demo" and "man" folders?
# 	\
# 	apt-mark auto '.*' > /dev/null; \
# 	[ -z "$savedAptMark" ] || apt-mark manual $savedAptMark > /dev/null; \
# 	apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
# 	\
# # update "cacerts" bundle to use Debian's CA certificates (and make sure it stays up-to-date with changes to Debian's store)
# # see https://github.com/docker-library/openjdk/issues/327
# #     http://rabexc.org/posts/certificates-not-working-java#comment-4099504075
# #     https://salsa.debian.org/java-team/ca-certificates-java/blob/3e51a84e9104823319abeb31f880580e46f45a98/debian/jks-keystore.hook.in
# #     https://git.alpinelinux.org/aports/tree/community/java-cacerts/APKBUILD?id=761af65f38b4570093461e6546dcf6b179d2b624#n29
# 	{ \
# 		echo '#!/usr/bin/env bash'; \
# 		echo 'set -Eeuo pipefail'; \
# 		echo 'if ! [ -d "$JAVA_HOME" ]; then echo >&2 "error: missing JAVA_HOME environment variable"; exit 1; fi'; \
# # 8-jdk uses "$JAVA_HOME/jre/lib/security/cacerts" and 8-jre and 11+ uses "$JAVA_HOME/lib/security/cacerts" directly (no "jre" directory)
# 		echo 'cacertsFile=; for f in "$JAVA_HOME/lib/security/cacerts" "$JAVA_HOME/jre/lib/security/cacerts"; do if [ -e "$f" ]; then cacertsFile="$f"; break; fi; done'; \
# 		echo 'if [ -z "$cacertsFile" ] || ! [ -f "$cacertsFile" ]; then echo >&2 "error: failed to find cacerts file in $JAVA_HOME"; exit 1; fi'; \
# 		echo 'trust extract --overwrite --format=java-cacerts --filter=ca-anchors --purpose=server-auth "$cacertsFile"'; \
# 	} > /etc/ca-certificates/update.d/docker-openjdk; \
# 	chmod +x /etc/ca-certificates/update.d/docker-openjdk; \
# 	/etc/ca-certificates/update.d/docker-openjdk; \
# 	\
# # https://github.com/docker-library/openjdk/issues/331#issuecomment-498834472
# 	find "$JAVA_HOME/lib" -name '*.so' -exec dirname '{}' ';' | sort -u > /etc/ld.so.conf.d/docker-openjdk.conf; \
# 	ldconfig; \
# 	\
# # basic smoke test
# 	javac --version; \
# 	java --version

# Python
ENV PATH /usr/local/bin:$PATH

ENV GPG_KEY 0D96DF4D4110E5C43FBFB17F2D347EA6AA65421D
ENV PYTHON_VERSION 3.7.7

RUN set -ex \
	\
	&& savedAptMark="$(apt-mark showmanual)" \
	&& apt-get update && apt-get install -y --no-install-recommends \
		dpkg-dev \
		gcc \
		dirmngr\
		libbluetooth-dev \
		libbz2-dev \
		libc6-dev \
		libexpat1-dev \
		libffi-dev \
		libgdbm-dev \
		liblzma-dev \
		libncursesw5-dev \
		libreadline-dev \
		libsqlite3-dev \
		libssl-dev \
		make \
		tk-dev \
		uuid-dev \
		wget \
		xz-utils \
		zlib1g-dev \
# as of Stretch, "gpg" is no longer included by default
		$(command -v gpg > /dev/null || echo 'gnupg dirmngr') \
	\
	&& wget -O python.tar.xz "https://www.python.org/ftp/python/${PYTHON_VERSION%%[a-z]*}/Python-$PYTHON_VERSION.tar.xz" \
	&& wget -O python.tar.xz.asc "https://www.python.org/ftp/python/${PYTHON_VERSION%%[a-z]*}/Python-$PYTHON_VERSION.tar.xz.asc" \
	&& export GNUPGHOME="$(mktemp -d)" \
	&& gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys "$GPG_KEY" \
	&& gpg --batch --verify python.tar.xz.asc python.tar.xz \
	&& { command -v gpgconf > /dev/null && gpgconf --kill all || :; } \
	&& rm -rf "$GNUPGHOME" python.tar.xz.asc \
	&& mkdir -p /usr/src/python \
	&& tar -xJC /usr/src/python --strip-components=1 -f python.tar.xz \
	&& rm python.tar.xz \
	\
	&& cd /usr/src/python \
	&& gnuArch="$(dpkg-architecture --query DEB_BUILD_GNU_TYPE)" \
	&& ./configure \
		--build="$gnuArch" \
		--enable-loadable-sqlite-extensions \
		--enable-optimizations \
		--enable-option-checking=fatal \
		--enable-shared \
		--with-system-expat \
		--with-system-ffi \
		--without-ensurepip \
	&& make -j "$(nproc)" \
# setting PROFILE_TASK makes "--enable-optimizations" reasonable: https://bugs.python.org/issue36044 / https://github.com/docker-library/python/issues/160#issuecomment-509426916
		PROFILE_TASK='-m test.regrtest --pgo \
			test_array \
			test_base64 \
			test_binascii \
			test_binhex \
			test_binop \
			test_bytes \
			test_c_locale_coercion \
			test_class \
			test_cmath \
			test_codecs \
			test_compile \
			test_complex \
			test_csv \
			test_decimal \
			test_dict \
			test_float \
			test_fstring \
			test_hashlib \
			test_io \
			test_iter \
			test_json \
			test_long \
			test_math \
			test_memoryview \
			test_pickle \
			test_re \
			test_set \
			test_slice \
			test_struct \
			test_threading \
			test_time \
			test_traceback \
			test_unicode \
		' \
	&& make install \
	&& ldconfig \
	\
	&& apt-mark auto '.*' > /dev/null \
	&& apt-mark manual $savedAptMark \
	&& find /usr/local -type f -executable -not \( -name '*tkinter*' \) -exec ldd '{}' ';' \
		| awk '/=>/ { print $(NF-1) }' \
		| sort -u \
		| xargs -r dpkg-query --search \
		| cut -d: -f1 \
		| sort -u \
		| xargs -r apt-mark manual \
	&& apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
	&& rm -rf /var/lib/apt/lists/* \
	\
	&& find /usr/local -depth \
		\( \
			\( -type d -a \( -name test -o -name tests -o -name idle_test \) \) \
			-o \
			\( -type f -a \( -name '*.pyc' -o -name '*.pyo' \) \) \
		\) -exec rm -rf '{}' + \
	&& rm -rf /usr/src/python \
	\
	&& python3 --version

# make some useful symlinks that are expected to exist
RUN cd /usr/local/bin \
	&& ln -s idle3 idle \
	&& ln -s pydoc3 pydoc \
	&& ln -s python3 python \
	&& ln -s python3-config python-config

# if this is called "PIP_VERSION", pip explodes with "ValueError: invalid truth value '<VERSION>'"
ENV PYTHON_PIP_VERSION 20.0.2
# https://github.com/pypa/get-pip
ENV PYTHON_GET_PIP_URL https://github.com/pypa/get-pip/raw/d59197a3c169cef378a22428a3fa99d33e080a5d/get-pip.py
ENV PYTHON_GET_PIP_SHA256 421ac1d44c0cf9730a088e337867d974b91bdce4ea2636099275071878cc189e

RUN set -ex; \
	\
	savedAptMark="$(apt-mark showmanual)"; \
	apt-get update; \
	apt-get install -y --no-install-recommends wget; \
	\
	wget -O get-pip.py "$PYTHON_GET_PIP_URL"; \
	echo "$PYTHON_GET_PIP_SHA256 *get-pip.py" | sha256sum --check --strict -; \
	\
	apt-mark auto '.*' > /dev/null; \
	[ -z "$savedAptMark" ] || apt-mark manual $savedAptMark; \
	apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
	rm -rf /var/lib/apt/lists/*; \
	\
	python get-pip.py \
		--disable-pip-version-check \
		--no-cache-dir \
		"pip==$PYTHON_PIP_VERSION" \
	; \
	pip --version; \
	\
	find /usr/local -depth \
		\( \
			\( -type d -a \( -name test -o -name tests -o -name idle_test \) \) \
			-o \
			\( -type f -a \( -name '*.pyc' -o -name '*.pyo' \) \) \
		\) -exec rm -rf '{}' +; \
	rm -f get-pip.py

RUN set -ex; \
	if ! command -v gpg > /dev/null; then \
		apt-get update; \
		apt-get install -y --no-install-recommends \
			gnupg \
			dirmngr \
		; \
		rm -rf /var/lib/apt/lists/*; \
	fi

# GCC 
# RUN set -ex; \
# 	if ! command -v gpg > /dev/null; then \
# 		apt-get update; \
# 		apt-get install -y --no-install-recommends \
# 			gnupg \
# 			dirmngr \
# 		; \
# 		rm -rf /var/lib/apt/lists/*; \
# 	fi

# # https://gcc.gnu.org/mirrors.html
# ENV GPG_KEYS \
# # 1024D/745C015A 1999-11-09 Gerald Pfeifer <gerald@pfeifer.com>
# 	B215C1633BCA0477615F1B35A5B3A004745C015A \
# # 1024D/B75C61B8 2003-04-10 Mark Mitchell <mark@codesourcery.com>
# 	B3C42148A44E6983B3E4CC0793FA9B1AB75C61B8 \
# # 1024D/902C9419 2004-12-06 Gabriel Dos Reis <gdr@acm.org>
# 	90AA470469D3965A87A5DCB494D03953902C9419 \
# # 1024D/F71EDF1C 2000-02-13 Joseph Samuel Myers <jsm@polyomino.org.uk>
# 	80F98B2E0DAB6C8281BDF541A7C8C3B2F71EDF1C \
# # 2048R/FC26A641 2005-09-13 Richard Guenther <richard.guenther@gmail.com>
# 	7F74F97C103468EE5D750B583AB00996FC26A641 \
# # 1024D/C3C45C06 2004-04-21 Jakub Jelinek <jakub@redhat.com>
# 	33C235A34C46AA3FFB293709A328C3A2C3C45C06
# RUN set -ex; \
# 	for key in $GPG_KEYS; do \
# 		gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
# 	done

# # https://gcc.gnu.org/mirrors.html
# ENV GCC_MIRRORS \
# 		https://ftpmirror.gnu.org/gcc \
# 		https://bigsearcher.com/mirrors/gcc/releases \
# 		https://mirrors-usa.go-parts.com/gcc/releases \
# 		https://mirrors.concertpass.com/gcc/releases \
# 		http://www.netgull.com/gcc/releases

# # Last Modified: 2018-10-30
# ENV GCC_VERSION 6.5.0
# # Docker EOL: 2020-04-30

# RUN set -ex; \
# 	\
# 	savedAptMark="$(apt-mark showmanual)"; \
# 	apt-get update; \
# 	apt-get install -y --no-install-recommends \
# 		dpkg-dev \
# 		flex \
# 	; \
# 	rm -r /var/lib/apt/lists/*; \
# 	\
# 	_fetch() { \
# 		local fetch="$1"; shift; \
# 		local file="$1"; shift; \
# 		for mirror in $GCC_MIRRORS; do \
# 			if curl -fL "$mirror/$fetch" -o "$file"; then \
# 				return 0; \
# 			fi; \
# 		done; \
# 		echo >&2 "error: failed to download '$fetch' from several mirrors"; \
# 		return 1; \
# 	}; \
# 	\
# 	_fetch "gcc-$GCC_VERSION/gcc-$GCC_VERSION.tar.xz.sig" 'gcc.tar.xz.sig' \
# # 6.5.0 (https://mirrors.kernel.org/gnu/gcc/6.5.0/), no gcc- prefix
# 		|| _fetch "$GCC_VERSION/gcc-$GCC_VERSION.tar.xz.sig"; \
# 	_fetch "gcc-$GCC_VERSION/gcc-$GCC_VERSION.tar.xz" 'gcc.tar.xz' \
# 		|| _fetch "$GCC_VERSION/gcc-$GCC_VERSION.tar.xz" 'gcc.tar.xz'; \
# 	gpg --batch --verify gcc.tar.xz.sig gcc.tar.xz; \
# 	mkdir -p /usr/src/gcc; \
# 	tar -xf gcc.tar.xz -C /usr/src/gcc --strip-components=1; \
# 	rm gcc.tar.xz*; \
# 	\
# 	cd /usr/src/gcc; \
# 	\
# # "download_prerequisites" pulls down a bunch of tarballs and extracts them,
# # but then leaves the tarballs themselves lying around
# 	./contrib/download_prerequisites; \
# 	{ rm *.tar.* || true; }; \
# 	\
# # explicitly update autoconf config.guess and config.sub so they support more arches/libcs
# 	for f in config.guess config.sub; do \
# 		wget -O "$f" "https://git.savannah.gnu.org/cgit/config.git/plain/$f?id=7d3d27baf8107b630586c962c057e22149653deb"; \
# # find any more (shallow) copies of the file we grabbed and update them too
# 		find -mindepth 2 -name "$f" -exec cp -v "$f" '{}' ';'; \
# 	done; \
# 	\
# 	dir="$(mktemp -d)"; \
# 	cd "$dir"; \
# 	\
# 	extraConfigureArgs=''; \
# 	dpkgArch="$(dpkg --print-architecture)"; \
# 	case "$dpkgArch" in \
# # with-arch: https://anonscm.debian.org/viewvc/gcccvs/branches/sid/gcc-6/debian/rules2?revision=9450&view=markup#l491
# # with-float: https://anonscm.debian.org/viewvc/gcccvs/branches/sid/gcc-6/debian/rules.defs?revision=9487&view=markup#l416
# # with-mode: https://anonscm.debian.org/viewvc/gcccvs/branches/sid/gcc-6/debian/rules.defs?revision=9487&view=markup#l376
# 		armel) \
# 			extraConfigureArgs="$extraConfigureArgs --with-arch=armv4t --with-float=soft" \
# 			;; \
# 		armhf) \
# 			extraConfigureArgs="$extraConfigureArgs --with-arch=armv7-a --with-float=hard --with-fpu=vfpv3-d16 --with-mode=thumb" \
# 			;; \
# 		\
# # with-arch-32: https://anonscm.debian.org/viewvc/gcccvs/branches/sid/gcc-6/debian/rules2?revision=9450&view=markup#l590
# 		i386) \
# 			osVersionID="$(set -e; . /etc/os-release; echo "$VERSION_ID")"; \
# 			case "$osVersionID" in \
# 				8) extraConfigureArgs="$extraConfigureArgs --with-arch-32=i586" ;; \
# 				*) extraConfigureArgs="$extraConfigureArgs --with-arch-32=i686" ;; \
# 			esac; \
# # TODO for some reason, libgo + i386 fails on https://github.com/gcc-mirror/gcc/blob/gcc-7_1_0-release/libgo/runtime/proc.c#L154
# # "error unknown case for SETCONTEXT_CLOBBERS_TLS"
# 			;; \
# 	esac; \
# 	\
# 	gnuArch="$(dpkg-architecture --query DEB_BUILD_GNU_TYPE)"; \
# 	/usr/src/gcc/configure \
# 		--build="$gnuArch" \
# 		--disable-multilib \
# 		--enable-languages=c,c++,fortran,go \
# 		$extraConfigureArgs \
# 	; \
# 	make -j "$(nproc)"; \
# 	make install-strip; \
# 	\
# 	cd ..; \
# 	\
# 	rm -rf "$dir" /usr/src/gcc; \
# 	\
# 	apt-mark auto '.*' > /dev/null; \
# 	[ -z "$savedAptMark" ] || apt-mark manual $savedAptMark; \
# 	apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false

# # gcc installs .so files in /usr/local/lib64...
# RUN set -ex; \
# 	echo '/usr/local/lib64' > /etc/ld.so.conf.d/local-lib64.conf; \
# 	ldconfig -v

# # ensure that alternatives are pointing to the new compiler and that old one is no longer used
# RUN set -ex; \
# 	dpkg-divert --divert /usr/bin/gcc.orig --rename /usr/bin/gcc; \
# 	dpkg-divert --divert /usr/bin/g++.orig --rename /usr/bin/g++; \
# 	dpkg-divert --divert /usr/bin/gfortran.orig --rename /usr/bin/gfortran; \
# 	update-alternatives --install /usr/bin/cc cc /usr/local/bin/gcc 999
	
ENV NODE_ENV=production

RUN chown node:node /usr/src
WORKDIR /usr/src

USER node
COPY package*.json ./

RUN npm config list \
    && npm ci \
    && npm cache clean --force



FROM base as dev

ENV NODE_ENV=development

ENV PATH=/usr/src/node_modules/.bin:$PATH

WORKDIR /usr/src

RUN npm install --only=development
WORKDIR /usr/src/app

CMD ["nodemon","-L","bin/www","--inspect=0.0.0.0:9229"]

FROM dev as test 

ENV NODE_ENV=test

CMD [ "mocha","./tests/*.js", "--recursive" ]

FROM test as audit

RUN npm audit

ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

FROM source as prod
WORKDIR /usr/src/app

COPY . .

CMD ["node","bin/www"]