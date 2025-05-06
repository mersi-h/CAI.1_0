package com.team.resources;

import org.springframework.core.io.InputStreamResource;

import java.io.IOException;
import java.io.InputStream;

public class MultipartInputStreamFileResource extends InputStreamResource {
    private final String filename;

    public MultipartInputStreamFileResource(InputStream inputStream, String filename) {
        super(inputStream);
        this.filename = filename;
    }

    @Override
    public String getFilename() {
        return this.filename;
    }

    /**
     * This method is overridden because the default implementation tries
     * to read the entire stream to calculate the length, which we want to avoid.
     */
    @Override
    public long contentLength() throws IOException {
        return -1;  // we do not know the length in advance
    }
}
